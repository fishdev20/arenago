'use client'

// export function useGetUser(uid: string) {
//   return useQuery({
//     queryKey: ['user', uid],
//     queryFn: () => getUser(uid!),
//     enabled: !!uid, // only runs if uid is available
//   })
// }

// export function useGetUsers() {
//   return useQuery({
//     queryKey: ['users'],
//     queryFn: getAllUsers,
//   })
// }

// export function useFindUserByEmail() {
//   return useMutation({
//     mutationFn: (email: string) => findUserByEmail(email),
//   })
// }

// export function useUpdateUser() {
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: ({ uid, data }: { uid: string; data: Partial<UserProfile> }) =>
//       updateUser(uid, data),
//     onSuccess: (_, { uid }) => {
//       // Invalidate to refetch fresh data
//       queryClient.invalidateQueries({ queryKey: ['user', uid] })
//     },
//   })
// }
