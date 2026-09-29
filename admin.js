import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const form = document.getElementById('add-project-form');
const statusMsg = document.getElementById('status-msg');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('p-title').value;
    const category = document.getElementById('p-category').value;
    const techInput = document.getElementById('p-tech').value;
    const description = document.getElementById('p-desc').value;

    const techArray = techInput.split(',').map(item => item.trim());

    statusMsg.innerText = "Connecting to Firestore...";

    try {
      await addDoc(collection(db, "projects"), {
        title: title,
        category: category,
        tech: techArray,
        description: description,
        createdAt: serverTimestamp()
      });

      statusMsg.innerText = "Project successfully uploaded to Firebase!";
      form.reset();
    } catch (error) {
      console.error("Error writing to Firestore: ", error);
      statusMsg.innerText = "Error uploading project: " + error.message;
    }
  });
}