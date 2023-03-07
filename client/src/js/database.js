import { openDB } from 'idb';

const initdb = async () =>
  openDB('tlnt', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('tlnt')) {
        console.log('tlnt database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('tlnt database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the database');

    // Create a connection to the database database and version we want to use.
    const tlntDb = await openDB('tlnt', 1);
    const transaction = tlntDb.transaction('tlnt', 'readwrite');
    const store = transaction.objectStore('tlnt');
    const request = store.put({id: 1, value: content});
    const result = await request;
    console.log('🚀 - data saved to the database', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const tlntDb = await openDB('tlnt', 1);

  // Create a new transaction and specify the database and data privileges.
  const transaction = tlntDb.transaction('tlnt', 'readonly');

  // Open up the desired object store.
  const store = transaction.objectStore('tlnt');

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
}
initdb();
