"use server"
export interface ApiInstanceOptions {
    url?: string; 
    headers?: Array<{ name: string; value: string }>; 
    token?: string; 
    contentType?: string
}