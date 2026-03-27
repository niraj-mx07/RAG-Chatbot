import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const SourceCitation = ({ sources = [] }) => {
  const [openCards, setOpenCards] = useState({});
  const [showAll, setShowAll] = useState(false);

  const visibleSources = useMemo(() => (showAll ? sources : sources.slice(0, 3)), [showAll, sources]);

  const toggleCard = (index) => {
    setOpenCards((previous) => ({ ...previous, [index]: !previous[index] }));
  };

  return (
    <div className="sources-wrap">
      <p className="sources-title">SOURCES</p>
      <div className="sources-grid">
        {visibleSources.map((source, index) => {
          const isOpen = Boolean(openCards[index]);
          return (
            <button
              type="button"
              key={`${source.filename}-${source.page}-${index}`}
              className={`source-card ${isOpen ? 'source-card-open' : ''}`}
              onClick={() => toggleCard(index)}
              style={{ animationDelay: `${index * 80}ms` }}
              aria-expanded={isOpen}
            >
              <div className="source-head">
                <span className="source-name">
                  [{source.filename}] — pg. {source.page ?? 'n/a'}
                </span>
                <ChevronDown size={16} className={isOpen ? 'rotated' : ''} />
              </div>
              {isOpen && <pre className="source-snippet">{source.snippet || 'No snippet available.'}</pre>}
            </button>
          );
        })}
      </div>
      {sources.length > 3 && (
        <button type="button" className="sources-more" onClick={() => setShowAll((prev) => !prev)}>
          {showAll ? 'Show fewer' : `+ ${sources.length - 3} more`}
        </button>
      )}
    </div>
  );
};

export default SourceCitation;
