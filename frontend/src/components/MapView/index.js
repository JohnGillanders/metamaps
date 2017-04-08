import React, { Component, PropTypes } from 'react'

import DataVis from '../common/DataVis'
import UpperOptions from '../common/UpperOptions'
import InfoAndHelp from '../common/InfoAndHelp'
import Instructions from './Instructions'
import VisualizationControls from '../common/VisualizationControls'
import MapChat from './MapChat'
import TopicCard from '../TopicCard'

export default class MapView extends Component {

  static propTypes = {
    mobile: PropTypes.bool,
    mapId: PropTypes.string,
    map: PropTypes.object,
    mapIsStarred: PropTypes.bool,
    onMapStar: PropTypes.func,
    onMapUnstar: PropTypes.func,
    filterData: PropTypes.object,
    allForFiltering: PropTypes.object,
    visibleForFiltering: PropTypes.object,
    toggleMetacode: PropTypes.func,
    toggleMapper: PropTypes.func,
    toggleSynapse: PropTypes.func,
    filterAllMetacodes: PropTypes.func,
    filterAllMappers: PropTypes.func,
    filterAllSynapses: PropTypes.func,
    toggleMapInfoBox: PropTypes.func,
    infoBoxHtml: PropTypes.string,
    currentUser: PropTypes.object,
    endActiveMap: PropTypes.func,
    launchNewMap: PropTypes.func,
    openImportLightbox: PropTypes.func,
    forkMap: PropTypes.func,
    openHelpLightbox: PropTypes.func,
    onZoomExtents: PropTypes.func,
    onZoomIn: PropTypes.func,
    onZoomOut: PropTypes.func,
    hasLearnedTopicCreation: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.state = {
      chatOpen: false
    }
  }

  componentWillUnmount() {
    this.endMap()
  }

  endMap() {
    this.setState({
      chatOpen: false
    })
    this.mapChat.reset()
    this.upperOptions.reset()
    this.props.endActiveMap()
  }

  componentDidUpdate(prevProps) {
    const oldMapId = prevProps.mapId
    const { mapId, launchNewMap } = this.props
    if (!oldMapId && mapId) launchNewMap(mapId)
    else if (oldMapId && mapId && oldMapId !== mapId) {
      this.endMap()
      launchNewMap(mapId)
    }
    else if (oldMapId && !mapId) this.endMap()
  }

  render = () => {
    const { mobile, map, currentUser, onOpen, onClose,
            toggleMapInfoBox, infoBoxHtml, allForFiltering, visibleForFiltering,
            toggleMetacode, toggleMapper, toggleSynapse, filterAllMetacodes,
            filterAllMappers, filterAllSynapses, filterData,
            openImportLightbox, forkMap, openHelpLightbox,
            mapIsStarred, onMapStar, onMapUnstar, openTopic,
            onZoomExtents, onZoomIn, onZoomOut, hasLearnedTopicCreation } = this.props
    const { chatOpen } = this.state
    const onChatOpen = () => {
      this.setState({chatOpen: true})
      onOpen()
    }
    const onChatClose = () => {
      this.setState({chatOpen: false})
      onClose()
    }
    const canEditMap = map && map.authorizeToEdit(currentUser)
    // TODO: stop using {...this.props} and make explicit
    return <div className="mapWrapper">
      <UpperOptions ref={x => this.upperOptions = x}
                    map={map}
                    currentUser={currentUser}
                    onImportClick={openImportLightbox}
                    onForkClick={forkMap}
                    canEditMap={canEditMap}
                    filterData={filterData}
                    allForFiltering={allForFiltering}
                    visibleForFiltering={visibleForFiltering}
                    toggleMetacode={toggleMetacode}
                    toggleMapper={toggleMapper}
                    toggleSynapse={toggleSynapse}
                    filterAllMetacodes={filterAllMetacodes}
                    filterAllMappers={filterAllMappers}
                    filterAllSynapses={filterAllSynapses} />
      <DataVis />
      {openTopic && <TopicCard {...this.props} />}
      {currentUser && <Instructions mobile={mobile} hasLearnedTopicCreation={hasLearnedTopicCreation} />}
      {currentUser && <MapChat {...this.props} onOpen={onChatOpen} onClose={onChatClose} chatOpen={chatOpen} ref={x => this.mapChat = x} />}
      <VisualizationControls map={map}
                             onClickZoomExtents={onZoomExtents}
                             onClickZoomIn={onZoomIn}
                             onClickZoomOut={onZoomOut} />
      <InfoAndHelp mapIsStarred={mapIsStarred}
                   currentUser={currentUser}
                   map={map}
                   onInfoClick={toggleMapInfoBox}
                   onMapStar={onMapStar}
                   onMapUnstar={onMapUnstar}
                   onHelpClick={openHelpLightbox}
                   infoBoxHtml={infoBoxHtml} />
    </div>
  }
}
