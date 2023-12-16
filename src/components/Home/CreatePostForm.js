import React, { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthUserContext";
import data2 from "../../shared/data2";
import data from "../../shared/data";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import app from "@/shared/FirebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Toast from "./Toast";
import { useRouter } from "next/router";
import { addRecordsToDBTables } from "@/utils/utils";
import Loading from "../Loading";

const USER_IMAGE =
  "https://cdn-icons-png.flaticon.com/128/5178/5178994.png?uid=R124143615&ga=GA1.1.1996791833.1701550540&semt=ais";

function CreatePostForm() {
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [file, setFile] = useState();
  const [submit, setSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const storage = getStorage(app);
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user === null) router.push("/");
  }, [user]);

  useEffect(() => {
    //load all logged in user information on load
    if (user) {
      setInputs((values) => ({ ...values, userName: user.displayName }));
      setInputs((values) => ({
        ...values,
        userImage: user.photoURL ? user.photoURL : USER_IMAGE
      }));
      setInputs((values) => ({ ...values, email: user.email }));
    }
  }, [user]);

  //color theme for multiselect items
  function multiSelectTheme(theme) {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "#0356fc",
        primary: "#0339a3"
      }
    };
  }

  //animation for deleting  multiselect items
  const deleteAnimation = makeAnimated();

  //save post to db on submit
  useEffect(() => {
    if (submit == true) {
      setIsLoading(true);
      savePost();
    }
  }, [submit]);

  //read in and fill inputs when typing
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  //save image to firebase storage upon submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    ///setShowToast(true);
    const storageRef = ref(storage, "playPal/" + file?.name);
    //console.log(file);
    //save image selected to Firebase storage
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        //console.log("Uploaded a file!");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (url) => {
          setInputs((values) => ({ ...values, image: url }));
          setSubmit(true);
        });
      });
  };

  //function to gather tags, create postId and save post to db
  const savePost = async () => {
    //set the postId to reversed title string
    const postId = inputs.title.split("").reverse().join("");

    //addRecordsToDBTables(inputs, postId, session.user.email, InputTags);
    await addRecordsToDBTables(inputs, postId, user.email, tags);
    setIsLoading(false);
    presentToast();
  };

  //fire toast, delay 3 seconds, then redirect to dashboard
  const presentToast = () => {
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      router.push("/dashboard");
    }, 3000);
  };

  return (
    <div>
      {showToast ? (
        <div className="absolute top-30 right-10">
          <Toast
            msg={"Post Created Successfully"}
            closeToast={() => setShowToast(false)}
          />
        </div>
      ) : null}
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="lg:max-w-[1126px] mx-auto mt-6 mb-6 h-screen">
          <h2 className="px-6 text-center lg:text-start text-[2.5rem] font-extrabold text-[#0356fc]">
            CREATE NEW POST
          </h2>
          <h2 className="max-w-[560px] mx-auto lg:mx-0 px-6 text-center lg:text-start text-gray-500 font-semibold">
            Create a new post to invite friends, family or strangers to join you
            in your activities!
          </h2>
          <div className="flex flex-col lg:flex-row lg:flex-wrap gap-3">
            <form
              className="px-6 flex flex-col items-center xl:w-1/3"
              onSubmit={handleSubmit}
            >
              <div className="my-5 w-80 max-w-lg">
                <input
                  name="title"
                  type="text"
                  id="base-input"
                  className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-[30rem] p-2.5 "
                  placeholder="Title..."
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="mt-5 mb-3 w-80 max-w-lg">
                <textarea
                  name="desc"
                  rows="4"
                  className="block p-2.5 w-full lg:w-[30rem] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Description..."
                  required
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="my-5 w-80 max-w-lg">
                <input
                  name="date"
                  type="date"
                  className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-[30rem] p-2.5"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="my-5 w-80 max-w-lg">
                <input
                  name="location"
                  type="text"
                  className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-[30rem] p-2.5"
                  placeholder="Location..."
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="my-5 w-80 max-w-lg">
                <input
                  name="zipCode"
                  type="text"
                  className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-[30rem] p-2.5"
                  placeholder="Zip Code..."
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="my-5 w-80 max-w-lg">
                <select
                  name="activity"
                  className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-[30rem] p-2.5"
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
                  className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-[30rem] p-0.5"
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
                  className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-[30rem] p-2.5"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div className="mt-3 mb-5 w-80 max-w-lg flex justify-center lg:justify-start">
                <button
                  type="submit"
                  className="text-white bg-[#0356fc] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full lg:w-auto px-5 py-2.5 text-center"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatePostForm;
