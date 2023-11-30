import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import data2 from "../../shared/data2";
import data from "../../shared/data";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import app from "./../../shared/FirebaseConfig";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Toast from "./Toast";

function CreatePostForm() {
  const { data: session } = useSession();
  const db = getFirestore(app);
  const storage = getStorage(app);

  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [file, setFile] = useState();
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (session) {
      setInputs((values) => ({ ...values, userName: session.user?.name }));
      setInputs((values) => ({ ...values, userImage: session.user?.image }));
      setInputs((values) => ({ ...values, email: session.user?.email }));
    }
  }, [session]);

  function multiSelectTheme(theme) {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "#f97316",
        primary: "#f97316"
      }
    };
  }

  const deleteAnimation = makeAnimated();

  useEffect(() => {
    if (submit == true) {
      savePost();
    }
  }, [submit]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Submit values: ", inputs);
    // console.log("Tags selected: ", tags);
    setShowToast(true);
    const storageRef = ref(storage, "playPal/" + file?.name);
    console.log(file);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("Uploaded a file!");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (url) => {
          setInputs((values) => ({ ...values, image: url }));
          setSubmit(true);
        });
      });
  };

  const savePost = async () => {
    //gather the tags and create a tag array for the db
    const InputTags = tags.map((obj) => obj.label);

    // Add a new document in collection "cities"
    await setDoc(doc(db, "posts", Date.now().toString()), {
      ...inputs,
      tags: InputTags
    });
  };

  return (
    <div>
      {showToast ? (
        <div className="absolute top-10 right-10">
          <Toast
            msg={"Post Created Successfully"}
            closeToast={() => setShowToast(false)}
          />
        </div>
      ) : null}
      <div className="lg:max-w-[1126px] mx-auto mt-6 mb-6">
        <h1 className="px-6 text-center lg:text-start text-[1.5rem] font-bold text-orange-600">
          CREATE NEW POST
        </h1>
        <h2 className="max-w-[560px] mx-auto lg:mx-0 px-6 text-center lg:text-start text-gray-500 font-semibold">
          Create a new post to invite friends, family or strangers to join you
          in your activities!
        </h2>
        <div className="flex flex-col lg:flex-row lg:flex-wrap gap-3 bg-red-50">
          <form
            className="px-6 flex flex-col items-center xl:w-1/3"
            onSubmit={handleSubmit}
          >
            <div className="my-5 w-80 max-w-lg">
              <input
                name="title"
                type="text"
                id="base-input"
                className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
                placeholder="Title..."
                required
                onChange={handleChange}
              />
            </div>
            <div className="mt-5 mb-3 w-80 max-w-lg">
              <textarea
                name="desc"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-500 focus:ring-orange-500 focus:border-orange-500 "
                placeholder="Description..."
                required
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="my-5 w-80 max-w-lg">
              <input
                name="slotsAvailable"
                type="number"
                className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                placeholder="Number of Participants"
                required
                onChange={handleChange}
              />
            </div>
            <div className="my-5 w-80 max-w-lg">
              <input
                name="date"
                type="date"
                className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                required
                onChange={handleChange}
              />
            </div>
            <div className="my-5 w-80 max-w-lg">
              <input
                name="location"
                type="text"
                className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                placeholder="Location..."
                required
                onChange={handleChange}
              />
            </div>
            <div className="my-5 w-80 max-w-lg">
              <input
                name="zipCode"
                type="text"
                className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                placeholder="Zip Code..."
                required
                onChange={handleChange}
              />
            </div>
            <div className="my-5 w-80 max-w-lg">
              <select
                name="activity"
                className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                required
                onChange={handleChange}
              >
                <option disabled defaultValue>
                  Select Activity
                </option>
                {data.GameList.map((item) => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="my-5 w-80 max-w-lg">
              <Select
                name="tags"
                theme={multiSelectTheme}
                options={data2.Options}
                className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-0.5"
                placeholder="Select Tags..."
                isSearchable
                isMulti
                autoFocus
                required
                components={deleteAnimation}
                onChange={setTags}
              />
            </div>
            <div className="my-5 w-80 max-w-lg">
              <input
                type="file"
                accept="image/gif, image/jpeg, image/png"
                className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="mt-3 mb-5 w-80 max-w-lg flex justify-center lg:justify-start">
              <button
                type="submit"
                className="text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full lg:w-auto px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePostForm;
