import { HttpService } from '@nestjs/axios';
import { HttpException } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';

export class AxiosHelper {
    static configure(service: HttpService) {
        service.axiosRef.interceptors.response.use(
            (response: AxiosResponse) => {
                return response.data;
            },
            (error: AxiosError) => {
                throw new HttpException(
                    error.response?.data || "Internal Server Error", 
                    error.response?.status || 500
                );
            },
        );
    }
}
