import Link from 'next/link';
import getPastelBgClass from '../../lib/getPastelBgClass';

const indicatorBadgeClass = {
  approved: 'badge-success',
  pending: 'badge-info',
  rejected: 'badge-error ',
  empty: 'badge-accent',
  default: 'badge-primary',
};

function TutorScorePanel({ scores, isOwner }) {
  console.log(scores);
  return (
    <div className="container my-5 mx-auto flex max-w-4xl flex-wrap justify-center gap-2">
      {scores
        .filter(
          (score) =>
            (Boolean(score.scoreImage) && score.status === 'approved') ||
            isOwner
        )
        .map((score, idx) => (
          <div className="indicator">
            {isOwner && score.status && (
              <span
                className={`badge indicator-item ${
                  indicatorBadgeClass[score.status || 'default']
                }`}
              >
                {score.status}
              </span>
            )}
            <div
              key={score.subjectId}
              className={`stats ${getPastelBgClass(
                score.subjectId
              )} m-auto text-primary-content shadow`}
            >
              <div key={idx} className="stat ">
                <div className="stat-title">
                  {score.subjectName} ({score.level})
                </div>
                <div className="stat-value text-center">
                  {score.currentScore}/{score.maxScore}
                </div>
                <div className="stat-desc text-right">{score.year}</div>
                {isOwner && score.scoreImage && (
                  <div className="stat-actions ">
                    <Link href={score.scoreImage}>
                      <a className={`btn btn-ghost btn-sm`} target="_blank">
                        View Score Image
                      </a>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default TutorScorePanel;
