"use client";

import { ButtonPrimary } from "@/components/buttons/ButtonPrimary";
import { COMMON_ERR_MSG } from "@/constants/error";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface SignIn {
  username: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { setAccessToken } = useAuthStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignIn>();

  const signInMutation = useMutation({
    mutationFn: async (data: SignIn) => {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || COMMON_ERR_MSG);
      }

      return result;
    },
    onSuccess: (result) => {
      const accessToken = result?.result?.data?.accessToken;
      const duration = result?.result?.data?.accessTokenValidFor;

      if (accessToken) {
        setAccessToken(accessToken, duration);
        toast.success("Sign In Berhasil");
        router.push("/home");
      } else {
        toast.error(COMMON_ERR_MSG);
      }
    },
    onError: (error) => {
      toast.error(error.message || COMMON_ERR_MSG);
    },
  });

  const onSubmit = (data: SignIn) => {
    signInMutation.mutate(data);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
          <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>

          <form action="#" method="POST" className="mt-6 space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  {...register("username", {
                    required: "Username harus diisi",
                  })}
                  id="username"
                  name="username"
                  type="username"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.username && (
                  <p
                    className="error-text"
                    role="alert"
                  >{`${errors.username.message}`}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  {...register("password", {
                    required: "Password harus diisi",
                  })}
                  id="password"
                  name="password"
                  type="password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.password && (
                  <p
                    className="error-text"
                    role="alert"
                  >{`${errors.password.message}`}</p>
                )}
              </div>
            </div>

            <div>
              <ButtonPrimary
                onClick={handleSubmit(onSubmit)}
                title="Sign In"
                isLoading={signInMutation.isPending}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
