import React, {
  FC, useState, useRef, ChangeEvent, Dispatch, SetStateAction, useEffect
} from 'react';

import { Button } from '.';


interface Props {
  id: string;
  center?: boolean;
  setter: Dispatch<SetStateAction<File | null>>;
}

const ImageUpload: FC<Props> = ({ id, center = false, setter }) => {
  const [file, setFile] = useState<File | null>();
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const filePickerRef = useRef<any>();

  const pickImageHandler = () => {
    filePickerRef.current.click();
  }

  const pickedHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let pickedFile: File;
    if(e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setter(pickedFile);
    }
  }

  useEffect(() => {
    if(!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result! as string);
    };
    fileReader.readAsDataURL(file);
  }, [file])

  return (
    <div className="form-control">
      <input
        id={id}
        ref={filePickerRef}
        style={{display: 'none'}}
        type="file"
        accept=".jpg, .png, .jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${center && 'center'}`}>
        {previewUrl && (
          <div className="image-upload__preview">
            <img src={previewUrl as string} alt="Preview"/>
          </div>
        )}
        <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
      </div>
    </div>
  )
}

export default ImageUpload;