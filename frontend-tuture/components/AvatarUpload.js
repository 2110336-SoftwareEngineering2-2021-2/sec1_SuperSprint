import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { Controller } from 'react-hook-form';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-identicon-sprites';
import avatarUrl from '../lib/avatarUrl';

function AvatarUpload({ hookFormControl, hookFormWatch, defaultValue = 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg', userId = '' }) {
  const [uploaded, setUploaded] = useState(false);

  function onAvatarDrop(value, acceptedFiles, onChange) {
    URL.revokeObjectURL(value.preview);
    try {
      onChange({
        preview: URL.createObjectURL(acceptedFiles[0]),
        file: acceptedFiles[0],
        name: acceptedFiles[0].name,
      });
      setUploaded(true);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Controller
      control={hookFormControl}
      name="avatar"
      render={({ field: { onChange, value } }) => (
        <Dropzone
          onDrop={(e) => {
            onAvatarDrop(value, e, onChange);
          }}
          multiple={false}
          accept="image/jpeg,image/png"
        >
          {({ getRootProps, getInputProps }) => (
            <div className="w-fit">
              <div className="avatar">
                <div className="relative w-24 rounded-full sm:w-40">
                  <div className="absolute rounded-full" {...getRootProps()}>
                    <input id="avatar" {...getInputProps()} />
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 text-primary opacity-0 transition-all hover:border-primary hover:opacity-100 sm:h-40 sm:w-40">
                      <FontAwesomeIcon fixedWidth icon={faCamera} size="2x" />
                    </div>
                  </div>
                  {uploaded ? (
                    <img src={value.preview} alt={value.name} />
                  ) : (
                    <img src={avatarUrl(defaultValue, (hookFormWatch('first_name') + hookFormWatch('last_name')) + userId)} alt="Avatar" />
                  )}
                </div>
              </div>
            </div>
          )}
        </Dropzone>
      )}
    />
  );
}

export default AvatarUpload;
