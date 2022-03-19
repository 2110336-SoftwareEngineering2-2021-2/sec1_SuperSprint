import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { Controller } from 'react-hook-form';
import * as style from '@dicebear/avatars-identicon-sprites';

function ScoreImageUpload({ subjectId, hookFormControl, defaultValue = '' }) {
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
      name={`${subjectId}.scoreImage`}
      render={({ field: { onChange, value } }) => (
        <Dropzone
          onDrop={(e) => {
            console.log(value);
            onAvatarDrop(value, e, onChange);
          }}
          multiple={false}
          accept="image/jpeg,image/png"
        >
          {({ getRootProps, getInputProps }) => (
            <div className="w-fit mask mask-square">
              <div className="relative h-32 w-32 sm:h-40 sm:w-40">
                <div
                  className="absolute h-32 w-32 sm:h-40 sm:w-40"
                  {...getRootProps()}
                >
                  <input id="scoreImage" {...getInputProps()} />
                  <div className="flex h-32 w-32 flex-col items-center justify-center gap-1 border-2 text-primary opacity-0 transition-all hover:border-primary hover:opacity-100 sm:h-40 sm:w-40">
                    <FontAwesomeIcon fixedWidth icon={faCamera} size="2x" />
                    <p className="text-center text-sm">
                      Click or Drop Here to upload
                    </p>
                  </div>
                </div>
                {uploaded ? (
                  <img src={value.preview} alt={value.name} />
                ) : (
                  <img src={defaultValue} alt="Score Image" />
                )}
              </div>
            </div>
          )}
        </Dropzone>
      )}
    />
  );
}

export default ScoreImageUpload;
