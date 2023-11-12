import React from "react";
import { useUser } from "../components/UserContext";
import { Card } from "flowbite-react";
import MainLayout from "../layouts/Main";

const ProfilePage = () => {
  const { loggedInUser } = useUser();

  const backHome = () => {
    window.location.href = "http://localhost:3000/home";
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center">
        <svg
          class="w-8 h-8 items-center justify-center cursor-pointer"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
          onClick = {backHome}
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9"
          />
        </svg>
      </div>
      <div className="flex items-center justify-center h-full">
        <Card
          className="max-w-sm border-0 flex items-center justify-center shadow-none "
          imgAlt="Meaningful alt text for an image that is not purely decorative"
          imgSrc={loggedInUser.avatar}
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {loggedInUser.userName}
          </h5>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
