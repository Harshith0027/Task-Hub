import AddTodo from "./AddTodo";
import Todos from "./Todos";
//import styles from "../image.module.css";
//styles.bg_custom

const Home = () => {
  return (
    <>
      <div className="flex justify-center items-start min-h-screen bg-gray-500 py-5">
        <div
          className={"flex flex-col w-full max-w-3xl border-2 border-teal-600 rounded-lg shadow-md shadow-teal-700 hover:shadow-2xl hover:shadow-green-700 overflow-hidden"}
        >
          <p className="text-center text-white text-lg font-bold px-5 py-5 bg-teal-700">
            Tasks by and for you:
          </p>
          <div className="p-5 bg-gradient-to-r from-blue-300  to-blue-400">
            <AddTodo />
            <Todos />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;