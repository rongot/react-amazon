import { useMutation } from "@tanstack/react-query"
import apiClient from "../Helper/ApiClient"
import { UserInfo } from "../types/Userinfo"

export const useSigninMutation = () =>
  useMutation({
    //asynce function except email and password
    //return resolve of api post funcrion
    mutationFn: async ({
      email,
      password,
    }: {
      email: string
      password: string
    }) =>
      (
        await apiClient.post<UserInfo>(`api/users/signin`, {
          email,
          password,
        })
      ).data,
  })

export const useSignUpMutation = () =>
  useMutation({
    //asynce function except email and password
    //return resolve of api post funcrion
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string
      email: string
      password: string
    }) =>
      (
        await apiClient.post<UserInfo>(`api/users/signUp`, {
          name,
          email,
          password,
        })
      ).data,
  })

export const useUpdateProfileMutation = () =>
  useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string
      email: string
      password: string
    }) =>
      (
        await apiClient.put<UserInfo>(`api/users/profile`, {
          name,
          email,
          password,
        })
      ).data,
  })
