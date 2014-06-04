window.realtime = {};

window.realtime.notifyTimeOut = null;
window.realtime.notifyUser = function (message) {
    if ($('.notice.metamaps').length == 0) {
        $('body').prepend('<div class="notice metamaps" />');
    }
    $('.notice.metamaps').hide().html(message).fadeIn('fast');
    
    clearTimeout(window.realtime.notifyTimeOut);
    window.realtime.notifyTimeOut = setTimeout(function () {
        $('.notice.metamaps').fadeOut('fast');
    }, 8000);
};

window.realtime.setupSocket = function () {
    var socket = window.realtime.socket;

    socket.emit('newMapperNotify', {
        userid: userid,
        username: username,
        mapid: mapid
    });

    // if you're the 'new guy' update your list with who's already online
    socket.on(userid + '-' + mapid + '-UpdateMapperList', function (data) {
        // data.userid
        // data.username
        //alert(data.username + ' is already online');
    });

    // receive word that there's a new mapper on the map
    socket.on('maps-' + mapid + '-newmapper', function (data) {
        // data.userid
        // data.username

        window.realtime.notifyUser(data.username + ' just came online');

        // send this new mapper back your details, and the awareness that you're online
        var update = {
            userToNotify: data.userid,
            username: username,
            userid: userid,
            mapid: mapid
        };
        socket.emit('updateNewMapperList', update);
    });

    socket.on('maps-' + mapid + '-lostmapper', function (data) {
        // data.userid
        // data.username

        window.realtime.notifyUser(data.username + ' just went offline');
    });

    socket.on('maps-' + mapid, function (data) {



        //as long as you weren't the origin of the changes, update your map
        if (data.origin != userid && goRealtime) {
            if (data.resource == 'Topic') {
                topic = $.parseJSON(data.obj);

                if (data.action == 'create') {
                    window.realtime.addTopicToMap(topic);
                } else if (data.action == 'update' && Mconsole.graph.getNode(topic.id) != 'undefined') {
                    window.realtime.updateTopicOnMap(topic);
                } else if (data.action == 'destroy' && Mconsole.graph.getNode(topic.id) != 'undefined') {
                    hideNode(topic.id)
                }

                return;
            } else if (data.resource == 'Synapse') {
                synapse = $.parseJSON(data.obj);

                if (data.action == 'create') {
                    window.realtime.addSynapseToMap(synapse);
                } else if (data.action == 'update' &&
                    Mconsole.graph.getAdjacence(synapse.data.$direction['0'], synapse.data.$direction['1']) != 'undefined') {
                    window.realtime.updateSynapseOnMap(synapse);
                } else if (data.action == 'destroy' &&
                    Mconsole.graph.getAdjacence(synapse.data.$direction['0'], synapse.data.$direction['1']) != 'undefined') {
                    var edge = Mconsole.graph.getAdjacence(synapse.data.$direction['0'], synapse.data.$direction['1']);
                    hideEdge(edge);
                }

                return;
            }
        }
    });
};

window.realtime.addTopicToMap = function (topic) {
    var newPos, tempForT;
    Mconsole.graph.addNode(topic);
    tempForT = Mconsole.graph.getNode(topic.id);
    tempForT.setData('dim', 1, 'start');
    tempForT.setData('dim', 25, 'end');
    newPos = new $jit.Complex();
    newPos.x = tempForT.data.$xloc;
    newPos.y = tempForT.data.$yloc;
    tempForT.setPos(newPos, 'start');
    tempForT.setPos(newPos, 'current');
    tempForT.setPos(newPos, 'end');
    Mconsole.fx.plotNode(tempForT, Mconsole.canvas);
    return Mconsole.labels.plotLabel(Mconsole.canvas, tempForT, Mconsole.config);
};

window.realtime.updateTopicOnMap = function (topic) {
    var newPos, tempForT;
    tempForT = Mconsole.graph.getNode(topic.id);
    tempForT.data = topic.data;
    tempForT.name = topic.name;
    if (MetamapsModel.showcardInUse === topic.id) {
        populateShowCard(tempForT);
    }
    newPos = new $jit.Complex();
    newPos.x = tempForT.data.$xloc;
    newPos.y = tempForT.data.$yloc;
    tempForT.setPos(newPos, 'start');
    tempForT.setPos(newPos, 'current');
    tempForT.setPos(newPos, 'end');
    return Mconsole.fx.animate({
        modes: ['linear', 'node-property:dim', 'edge-property:lineWidth'],
        transition: $jit.Trans.Quad.easeInOut,
        duration: 500
    });
};

window.realtime.addSynapseToMap = function (synapse) {
    var Node1, Node2, tempForS;
    Node1 = Mconsole.graph.getNode(synapse.data.$direction[0]);
    Node2 = Mconsole.graph.getNode(synapse.data.$direction[1]);
    Mconsole.graph.addAdjacence(Node1, Node2, {});
    tempForS = Mconsole.graph.getAdjacence(Node1.id, Node2.id);
    tempForS.setDataset('start', {
        lineWidth: 0.4
    });
    tempForS.setDataset('end', {
        lineWidth: 2
    });
    tempForS.data = synapse.data;
    Mconsole.fx.plotLine(tempForS, Mconsole.canvas);
    return Mconsole.fx.animate({
        modes: ['linear', 'node-property:dim', 'edge-property:lineWidth'],
        transition: $jit.Trans.Quad.easeInOut,
        duration: 500
    });
};

window.realtime.updateSynapseOnMap = function (synapse) {
    var k, tempForS, v, wasShowDesc, _ref;
    tempForS = Mconsole.graph.getAdjacence(synapse.data.$direction[0], synapse.data.$direction[1]);
    wasShowDesc = tempForS.data.$showDesc;
    _ref = synapse.data;
    for (k in _ref) {
        v = _ref[k];
        tempForS.data[k] = v;
    }
    tempForS.data.$showDesc = wasShowDesc;
    if (MetamapsModel.edgecardInUse === synapse.data.$id) {
        editEdge(tempForS, false);
    }
    return Mconsole.plot();
};