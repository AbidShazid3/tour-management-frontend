import { baseApi } from "@/redux/baseApi";


export const divisionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDivision: builder.query({
            query: () => ({
                url: '/division',
                method: 'GET',
            }),
            providesTags: ['DIVISION'],
        }),
        getSingleDivision: builder.query({
            query: (id) => ({
                url: `/division/${id}`,
                method: 'GET',
            }),
            providesTags: ['DIVISION'],
        }),
        addDivision: builder.mutation({
            query: (divisionInfo) => ({
                url: '/division/create',
                method: 'POST',
                data: divisionInfo
            }),
            invalidatesTags: ['DIVISION'],
        }),
        updateDivision: builder.mutation({
            query: (id, ...divisionInfo) => ({
                url: `/division/${id}`,
                method: 'PATCH',
                data: divisionInfo
            }),
            invalidatesTags: ['DIVISION'],
        }),
        deleteDivision: builder.mutation({
            query: (id) => ({
                url: `/division/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['DIVISION'],
        }),
    })
})


export const { useGetDivisionQuery,
    useGetSingleDivisionQuery,
    useAddDivisionMutation,
    useUpdateDivisionMutation,
    useDeleteDivisionMutation,
} = divisionApi;