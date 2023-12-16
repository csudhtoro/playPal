import { getFirestore, doc, writeBatch } from "firebase/firestore";
import app from "@/shared/FirebaseConfig";

const db = getFirestore(app);

//batch add functions to sync both db collections. If one fails to add, both will fail
export const addRecordsToDBTables = async (
  inputs,
  postId,
  email,
  inputTags
) => {
  const batch = writeBatch(db);

  const postRef = doc(db, "Posts", email, "PostsOwned", postId);
  batch.set(postRef, { ...inputs, tags: inputTags });

  const publicPostRef = doc(db, "PublicPosts", postId);
  batch.set(publicPostRef, { ...inputs, tags: inputTags });

  await batch.commit();
};

//batch delete functions to sync both db collections. If one fails to delete, both will fail
export const removeRecordsFromDB = async (postId, email) => {
  const batch = writeBatch(db);

  const postRef = doc(db, "Posts", email, "PostsOwned", postId);
  batch.delete(postRef);

  const publicPostRef = doc(db, "PublicPosts", postId);
  batch.delete(publicPostRef);

  await batch.commit();
};
