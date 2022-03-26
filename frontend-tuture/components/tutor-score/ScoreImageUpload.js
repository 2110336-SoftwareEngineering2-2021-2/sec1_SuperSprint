import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropzone from 'react-dropzone';
import { Controller } from 'react-hook-form';

function ScoreImageUpload({ subjectId, hookFormControl, defaultValue = '' }) {
  function onAvatarDrop(value, acceptedFiles, onChange) {
    URL.revokeObjectURL(value.preview);
    try {
      onChange({
        preview: URL.createObjectURL(acceptedFiles[0]),
        file: acceptedFiles[0],
        name: acceptedFiles[0].name,
      });
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
            <div className="relative flex h-32 w-32 overflow-hidden rounded-xl sm:h-40 sm:w-40">
              <div className="absolute h-full w-full" {...getRootProps()}>
                <input id="scoreImage" {...getInputProps()} />
                <div className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-xl border-2 border-zinc-300 text-black opacity-80 transition-all hover:border-primary hover:text-primary hover:opacity-100">
                  <FontAwesomeIcon fixedWidth icon={faFileUpload} size="2x" />
                  {value.file && (
                    <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap px-2 text-center text-xs">
                      {value.name}
                    </span>
                  )}
                  <p className="text-center text-xs">
                    Click or Drop Here to upload
                  </p>
                </div>
              </div>
              {value.file ? (
                <img
                  src={value.preview}
                  alt={value.name}
                  className="my-auto h-full w-full object-cover"
                />
              ) : (
                defaultValue && (
                  <img
                    src={defaultValue}
                    alt="Score Image"
                    className="my-auto h-full w-full object-cover"
                  />
                )
              )}
            </div>
          )}
        </Dropzone>
      )}
    />
  );
}

export default ScoreImageUpload;
