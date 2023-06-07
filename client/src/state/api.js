import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'




export const api= createApi({
	baseQuery:fetchBaseQuery({baseUrl:process.env.REACT_APP_BASE_URL}),
	reducerPath:"adminApi",
	tagTypes:["User","Products","Customers"],
	endpoints:(build)=>({
		getUser:build.query({
			query:(id)=> `general/user/${id}`,
		}),
		getProducts:build.query({
			query:(id)=> `client/products`,
			providesTags:["Products"]
		}),
		getCustomers:build.query({
			query:()=> `client/customers`,
			providesTags:["Customers"]
		}),
		getTransactions:build.query({
			query:({page, pageSize, sort, search })=> ({
				url: "client/transactions",
				method: "GET",
				params: { page, pageSize, sort, search }
			}),
			
		})
	})
})


export const{useGetUserQuery,useGetProductsQuery,useGetCustomersQuery}= api;