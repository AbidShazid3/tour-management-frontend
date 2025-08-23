import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITourPackage } from "@/types";


export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTour: builder.query<IResponse<ITourPackage[]>, unknown>({
            query: () => ({
                url: '/tour',
                method: "GET",
            }),
            providesTags: ['TOUR'],
        }),
        getSingleTour: builder.query<IResponse<ITourPackage>, unknown>({
            query: (slug) => ({
                url: `/tour/${slug}`,
                method: "GET",
            }),
            providesTags: ['TOUR'],
        }),
        addTour: builder.mutation({
            query: (tourInfo) => ({
                url: '/tour/create',
                method: 'POST',
                data: tourInfo
            }),
            invalidatesTags: ['TOUR'],
        }),
        updateTour: builder.mutation({
            query: (id, ...tourInfo) => ({
                url: `/tour/${id}`,
                method: 'PATCH',
                data: tourInfo
            }),
            invalidatesTags: ['TOUR'],
        }),
        deleteTour: builder.mutation({
            query: (id) => ({
                url: `/tour/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['TOUR'],
        }),
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


export const { useGetTourQuery,
    useGetSingleTourQuery,
    useAddTourMutation,
    useUpdateTourMutation,
    useDeleteTourMutation,
    useGetTourTypesQuery,
    useAddTourTypeMutation,
    useUpdateTourTypeMutation,
    useDeleteTourTypeMutation,
} = tourApi;