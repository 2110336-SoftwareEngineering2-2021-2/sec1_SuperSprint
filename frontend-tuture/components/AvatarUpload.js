import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';

function AvatarUpload({
  firstName = 'John',
  avatarSeed,
  avatarFile,
  setAvatarFile,
}) {
  // const [avatarFile, setAvatarFile] = useState({ preview: '', name: '' });
  const [uploaded, setUploaded] = useState(false);

  useEffect(() => {
    const fallbackAvatar =
      'https://ui-avatars.com/api/?background=random&&length=1' +
      (firstName !== '' ? '&&name=' + firstName[0] + `${avatarSeed}` : '');

    if (!uploaded) {
      setAvatarFile({
        preview: fallbackAvatar,
        name: 'Default Avatar',
      });
    }
  }, [firstName, avatarSeed, uploaded, setAvatarFile]);

  function onAvatarDrop(acceptedFiles) {
    try {
      setAvatarFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
      setUploaded(true);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    return () => URL.revokeObjectURL(avatarFile.preview);
  }, [avatarFile]);

  return (
    <Dropzone
      onDrop={onAvatarDrop}
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
              <img src={avatarFile.preview} alt={avatarFile.name} />
            </div>
          </div>
        </div>
      )}
    </Dropzone>
  );
}

export default AvatarUpload;
