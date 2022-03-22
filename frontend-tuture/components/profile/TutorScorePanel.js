import Link from 'next/link';
import getPastelBgClass from '../../lib/getPastelBgClass';

function TutorScorePanel({ scores, isOwner }) {
  return (
    <div className="container my-5 mx-auto flex max-w-4xl flex-wrap justify-center gap-2">
      {scores.map((score, idx) => (
        <div
          key={score.subjectId}
          className={`stats ${getPastelBgClass(
            score.subjectId
          )} text-primary-content shadow`}
        >
          <div key={idx} className="stat ">
            <div className="stat-title">
              {score.subject} ({score.level})
            </div>
            <div className="stat-value text-center">
              {score.score}/{score.maxScore}
            </div>
            <div class="stat-desc text-right">{score.year}</div>
            {isOwner && (
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
      ))}
    </div>
  );
}

export default TutorScorePanel;
