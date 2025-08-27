import { baseApi } from "@/redux/baseApi";


export const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBooking: builder.mutation({
            query: (bookingInfo) => ({
                url: '/booking',
                method: 'POST',
                data: bookingInfo
            }),
            invalidatesTags: ['BOOKING'],
        }),
    })
})


export const { useCreateBookingMutation,
} = bookingApi;