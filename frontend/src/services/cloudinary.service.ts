import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';


type UploadPreset = 'avatar' | 'place_image';

class CloudinaryService {
  private readonly BASE_URL: string = process.env.REACT_APP_CLOUDINARY_API_BASE_URL!;
  private readonly ax: AxiosInstance;

  constructor() {
    const config: AxiosRequestConfig = {
      baseURL: this.BASE_URL
    };

    const interceptorResponseFn = (
      response: AxiosResponse<any>
    ): AxiosResponse<any> => response.data;

    const interceptorErrorFn = (error: any) => Promise.reject(error.response);

    this.ax = axios.create(config);
    this.ax.interceptors.response.use(
      interceptorResponseFn, interceptorErrorFn
    );
  }

  upload = async(file: File, preset: UploadPreset): Promise<string> => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', preset);
    const response: any = await this.ax.post('/image/upload', data);
    return response.secure_url;
  }
}

export default new CloudinaryService();
