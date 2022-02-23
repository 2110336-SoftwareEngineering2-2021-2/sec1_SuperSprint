import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { Controller } from 'react-hook-form';

function AvatarUpload({
  hookFormControl,
  hookFormSetValue,
  firstName = 'John',
  avatarSeed,
}) {
  const [uploaded, setUploaded] = useState(false);

  useEffect(async () => {
    const fallbackAvatarUrl =
      'https://ui-avatars.com/api/?background=random&&length=1' +
      (firstName !== '' ? '&&name=' + firstName[0] + `${avatarSeed}` : '');
    const fallbackAvatarFile = await urlToObject(fallbackAvatarUrl);

    if (!uploaded) {
      hookFormSetValue('avatar', {
        preview: fallbackAvatarUrl,
        file: fallbackAvatarFile,
      });
    }
  }, [firstName, avatarSeed, uploaded]);

  async function urlToObject(url) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
    });
    const blob = await response.blob();
    return new File([blob], 'avatar.jpg', { type: blob.type });
  }

  function onAvatarDrop(value, acceptedFiles, onChange) {
    URL.revokeObjectURL(value.preview);
    try {
      onChange({
        preview: URL.createObjectURL(acceptedFiles[0]),
        file: acceptedFiles[0],
      });
      setUploaded(true);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Controller
      control={hookFormControl}
      name={`avatar`}
      defaultValue={{ preview: '', name: '' }}
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
                  <img src={value.preview} alt={value.name} />
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
