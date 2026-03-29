import React, { useMemo, useState } from 'react'
import TopicModal from './TopicModal'
import DOM from './ReactJS/DOM'
import Reconciliation from './ReactJS/Reconciliation'
import ReactDiffingAlgorithm from './ReactJS/ReactDiffingAlgorithm'
import ReactFiberArchitecture from './ReactJS/ReactFiberArchitecture'
import ReactRenderingProcess from './ReactJS/ReactRenderingProcess'
import ReactuseEffect from './ReactJS/ReactuseEffect'
import ConverdTopic from './ReactJS/converdTopic'
import ReactMemoHooks from './ReactJS/ReactMemoHooks'
import ImpTopic from './ReactJS/ImpTopic'
import ReactRerenderStepper from './ReactJS/ReactRerenderStepper'

const mockTopics = [
  {
    id: 0,
    name: 'Topics Covered',
    description: 'Quick overview of all the React topics this series will cover.',
    created: 'March 12, 2026',
    status: "pending",
    Details: <ConverdTopic />,
  },
  {
    id: 1,
    name: 'Document Object Model (DOM)',
    description: 'Understanding the structure and manipulation of the DOM is crucial for effective web development.',
    created: 'Jan 25, 2026',
    status: 'done',
    Details: <DOM/>,
  },
  {
    id: 2,
    name: 'Reconciliation',
    description: 'React का reconciliation process कैसे काम करता है और यह performance को कैसे optimize करता है।',
    created: 'March 11, 2026',
    status: "done",
    Details: <Reconciliation/>,
  },
  {
    id: 3,
    name: 'React Diffing Algorithm (Deep Internals)',
    description: 'React का diffing algorithm कैसे काम करता है और यह कैसे determine करता है कि कौन से components को update करना है।',
    created: 'March 11, 2026',
    status: 'done',
    Details: <ReactDiffingAlgorithm/>,
  },
  {
    id: 4,
    name: 'React Fiber Architecture',
    description: 'Understanding the React Fiber architecture and how it enables efficient rendering and updates.',
    created: 'March 11, 2026',
    status: "pending",
    Details: <ReactFiberArchitecture/>,
  },
  {
    id: 5,
    name: 'React Rendering Process',
    description: 'React का rendering process कैसे काम करता है और यह कैसे optimize किया जाता है।',
    created: 'March 11, 2026',
    status: "pending",
    Details: <ReactRenderingProcess/>,
  },
  {
    id: 6,
    name: 'Reactuse Effect',
    description: 'React useEffect hook का उपयोग कैसे करें और यह component lifecycle के साथ कैसे interact करता है।',
    created: 'March 11, 2026',
    status: "pending",
    Details: <ReactuseEffect/>,
  },
  {
    id: 7,
    name: 'useMemo / useCallback / useRef / React.memo',
    description: 'Deep dive into memoization hooks and when to use each of them.',
    created: 'March 12, 2026',
    status: "pending",
    Details: <ReactMemoHooks/>,
  },
  {
    id: 8,
    name: 'Important Topic',
    description: 'Important',
    created: 'March 23, 2026',
    status: "pending",
    Details: <ImpTopic/>,
  },
  {
    id: 9,
    name: 'React Rerender Stepper',
    description: 'React Rerender Stepper',
    created: 'March 23, 2026',
    status: "pending",
    Details: <ReactRerenderStepper/>,
  },
]





export default function index() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTopicId, setActiveTopicId] = useState(null)
  const [sortKey, setSortKey] = useState('status')
  const [sortAsc, setSortAsc] = useState(true)

  const filteredTopics = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase()
    if (!normalized) return mockTopics
    return mockTopics.filter((topic) => {
      return (
        topic.name.toLowerCase().includes(normalized) ||
        topic.description.toLowerCase().includes(normalized)
      )
    })
  }, [searchTerm])

  const sortedTopics = useMemo(() => {
    const topics = [...filteredTopics]
    topics.sort((a, b) => {
      const aVal = (a[sortKey] || '').toString().toLowerCase()
      const bVal = (b[sortKey] || '').toString().toLowerCase()

      if (aVal < bVal) return sortAsc ? -1 : 1
      if (aVal > bVal) return sortAsc ? 1 : -1
      return 0
    })
    return topics
  }, [filteredTopics, sortKey, sortAsc])

  const toggleSort = (key) => {
    if (key === sortKey) {
      setSortAsc((prev) => !prev)
    } else {
      setSortKey(key)
      setSortAsc(true)
    }
  }

  const activeTopic = useMemo(
    () => mockTopics.find((topic) => topic.id === activeTopicId) ?? null,
    [activeTopicId]
  )

  return (
    <section className="topics-page p-2">
      <header className="topics-header p-1">
        <h4>Topics</h4>
      </header>

      <div className="topics-search" style={{ marginBottom: '1rem' }}>
        <input
          className="form-control"
          type="search"
          placeholder="Search topics..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          style={{ width: '240px' }}
        />
      </div>

      <div className="table-wrapper">
        <table className="responsive-table">
          <thead>
            <tr>
              <th onClick={() => toggleSort('name')} style={{ cursor: 'pointer' }}>
                Topic {sortKey === 'name' ? (sortAsc ? '▲' : '▼') : ''}
              </th>
              <th>Description</th>
              <th>View</th>
              <th onClick={() => toggleSort('status')} style={{ cursor: 'pointer' }}>
                Status {sortKey === 'status' ? (sortAsc ? '▲' : '▼') : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTopics.map((topic) => (
              <tr key={topic.id}>
                <td>
                  <strong>{topic.name}</strong>
                </td>
                <td>{topic.description}</td>
                <td>
                  <button
                    className="icon-button"
                    type="button"
                    onClick={() => setActiveTopicId(topic.id)}
                    aria-label={`View details for ${topic.name}`}
                  >
                    <i className="fas fa-eye" aria-hidden="true" />
                  </button>
                </td>
                <td>
                  <span className={`status-pill status-pill--${topic.status.toLowerCase()}`}>
                    {topic.status}
                  </span>
                </td>
              </tr>
            ))}
            {sortedTopics.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '1.2rem' }}>
                  No topics found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <TopicModal topic={activeTopic} onClose={() => setActiveTopicId(null)} />
    </section>
  )
}
