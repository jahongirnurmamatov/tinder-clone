import React, { useState } from "react";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState("");
  const [genderPreference, setGenderPreference] = useState("");

  const loading = false;
  const signup = () => {
    alert("signup successfull");
  };

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        signup();
      }}
    >
      {/*NAME  */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <div className="mt-1">
          <input
            type="name"
            name="name"
            id="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
           focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>
      </div>
      {/* email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1">
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
           focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>
      </div>

      {/* password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="mt-1">
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="password"
            required
            value={password}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
           focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>
      </div>
      {/* age */}
      <div>
        <label
          htmlFor="age"
          className="block text-sm font-medium text-gray-700"
        >
          Age
        </label>
        <div className="mt-1">
          <input
            type="number"
            name="age"
            id="age"
            autoComplete="age"
            min={18}
            max={120}
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
           focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>
      </div>

      {/* gender */}

      <div>
        <label
          htmlFor="age"
          className="block text-sm font-medium text-gray-700"
        >
          Yout Gender
        </label>
        <div className="mt-2 flex gap-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="gender"
              id="male"
              checked={gender === "male"}
              onChange={() => setGender("male")}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
            />
            <label htmlFor="male" className="ml-2 block text-sm text-gray-900">
              Male
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="gender"
              id="female"
              checked={gender === "female"}
              onChange={() => setGender("female")}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
            />
            <label
              htmlFor="female"
              className="ml-2 block text-sm text-gray-900"
            >
              Female
            </label>
          </div>
        </div>
      </div>
      {/* preference */}
      <div className="">
        <label className="block text-sm font-medium text-gray-700">
          Prefer Me
        </label>
        <div className="mt-2 space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="prefer-male"
              value={"male"}
              checked={genderPreference === "male"}
              name="gender-preference"
              onChange={(e) => setGenderPreference(e.target.value)}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
            />
            <label
              htmlFor="preder-male"
              className="ml-2 block text-sm text-gray-900"
            >
              Male
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="prefer-male"
              value={"female"}
              checked={genderPreference === "female"}
              name="gender-preference"
              onChange={(e) => setGenderPreference(e.target.value)}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
            />
            <label
              htmlFor="preder-female"
              className="ml-2 block text-sm text-gray-900"
            >
              Female
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="prefer-both"
              value={"bothr"}
              checked={genderPreference === "bothr"}
              name="gender-preference"
              onChange={(e) => setGenderPreference(e.target.value)}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
            />
            <label
              htmlFor="preder-bothr"
              className="ml-2 block text-sm text-gray-900"
            >
              Both
            </label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm 
      text-sm font-medium text-white ${
        loading
          ? "bg-pink-400 cursor-not-allowed"
          : "bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
      }
      `}
      >
        {loading ? 'Signing in...' : 'Submit'}
      </button>
    </form>
  );
};

export default SignUpForm;
