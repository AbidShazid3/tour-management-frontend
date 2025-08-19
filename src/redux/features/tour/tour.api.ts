import { baseApi } from "@/redux/baseApi";


export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTourTypes: builder.query({
            query: () => ({
                url: '/tour/tour-types',
                method: "GET",
            }),
            providesTags: ['TOUR'],
            transformResponse: (arg) => arg.data,
        }),
        addTourType: builder.mutation({
            query: (tourTypeInfo) => ({
                url: '/tour/create-tour-type',
                method: 'POST',
                data: tourTypeInfo
            }),
            invalidatesTags: ['TOUR'],
        }),
        updateTourType: builder.mutation({
            query: (id, ...tourTypeInfo) => ({
                url: `/tour/tour-types/${id}`,
                method: 'PATCH',
                data: tourTypeInfo
            }),
            invalidatesTags: ['TOUR'],
        }),
        deleteTourType: builder.mutation({
            query: (id) => ({
                url: `/tour/tour-types/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['TOUR'],
        }),
    })
})


export const { useGetTourTypesQuery,
    useAddTourTypeMutation,
    useUpdateTourTypeMutation,
    useDeleteTourTypeMutation,
} = tourApi;