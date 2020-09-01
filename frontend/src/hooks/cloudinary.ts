import { useMutation } from 'react-query';

import { Cloudinary } from '../services';


export function useImageUpload() {
  return useMutation(
    async(image: File) => await Cloudinary.upload(image, 'place_image')
  );
}

export function useAvatarUpload() {
  return useMutation(
    async(image: File) => await Cloudinary.upload(image, 'avatar')
  );
}