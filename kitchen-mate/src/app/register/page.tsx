import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/chef1.png";
import { handleRegister } from "@/actions/user";

export default function Register() {
  return (
    <div className="register-form-container flex items-center justify-center min-h-screen bg-gradient-to-r from-red-800 via-red-600 to-red-100">
      <form className="register-form bg-white p-20 rounded shadow-xl rounded" action={handleRegister}>
        <div className="mb-4 flex justify-center">
          <Image src={logo} alt="Logo" className="w-20 h-20" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-red-700 text-center">
          Register
        </h2>
        <div className="mb-4">
        </div>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-red-700 text-sm font-bold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="border rounded w-full py-2 px-3 text-red-600"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-red-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border rounded w-full py-2 px-3 text-red-600"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-red-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border rounded w-full py-2 px-3 text-red-600"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-700 hover:text-text-white text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
        >
          Register
        </button>
        <p className="text-center text-gray-900 text-sm mt-10">
          Already have an account?{" "}
          <Link href="/login">
            <p className="text-center text-red-600 text-sm hover:text-red-800">
              Login Here.
            </p>
          </Link>
        </p>
      </form>
    </div>
  );
}
