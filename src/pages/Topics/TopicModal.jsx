import ReactModal from 'react-modal'

if (typeof window !== 'undefined') {
  ReactModal.setAppElement('#root')
}

function TopicDetails({ topic }) {
  const Content = topic.content ?? topic.description ?? 'No details available for this topic.'

  return (
    <div className="topic-details">
      <div className="topic-details-content">
        {typeof Content === 'function' || typeof Content === 'object' ? <Content /> : Content}
      </div>
    </div>
  )
}
export default function TopicModal({ topic, onClose }) {
  return (
    <ReactModal
      isOpen={Boolean(topic)}
      onRequestClose={onClose}
      overlayClassName="topic-modal-overlay"
      className="topic-modal"
      contentLabel={topic ? `Topic details for ${topic.name}` : 'Topic details'}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
    >
      {topic && (
        <>
          <header className="modal-header">
            <div className="modal-title-group">
              <h2>{topic.name}</h2>
              <p className="modal-submeta">
                Updated: {topic.updatedAt} • Status: {topic.status}
              </p>
            </div>
            <button className="modal-close" onClick={onClose} aria-label="Close details">
              <span aria-hidden="true">×</span>
            </button>
          </header>
          <div className="modal-body">
            <TopicDetails topic={topic} />
          </div>
        </>
      )}
    </ReactModal>
  )
}