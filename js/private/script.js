/*
    jQuery Mobile IPTV
    Author: Ming Yu Zhao (mingyu.zhao@gmail.com)
*/
(function($,W,D,undefined) {
    W.myIPTV = W.myIPTV || {};
    W.myIPTV = {
        streams: [],
        curChannel: -1,
        init: function() {
            myIPTV.initStreamList();
            var video = $('#video');
            if(Hls.isSupported()) {
              W.config = {
                  autoStartLoad: true,
                  startPosition: -1,
                  debug: false,
                  capLevelOnFPSDrop: false,
                  capLevelToPlayerSize: false,
                  defaultAudioCodec: undefined,
                  initialLiveManifestSize: 1,
                  maxBufferLength: 30,
                  maxMaxBufferLength: 600,
                  maxBufferSize: 60*1000*1000,
                  maxBufferHole: 0.5,
                  lowBufferWatchdogPeriod: 0.5,
                  highBufferWatchdogPeriod: 3,
                  nudgeOffset: 0.1,
                  nudgeMaxRetry: 3,
                  maxFragLookUpTolerance: 0.25,
                  liveSyncDurationCount: 3,
                  liveMaxLatencyDurationCount: Infinity,
                  enableWorker: true,
                  enableSoftwareAES: true,
                  manifestLoadingTimeOut: 10000,
                  manifestLoadingMaxRetry: 1,
                  manifestLoadingRetryDelay: 1000,
                  manifestLoadingMaxRetryTimeout: 64000,
                  startLevel: undefined,
                  levelLoadingTimeOut: 10000,
                  levelLoadingMaxRetry: 4,
                  levelLoadingRetryDelay: 1000,
                  levelLoadingMaxRetryTimeout: 64000,
                  fragLoadingTimeOut: 20000,
                  fragLoadingMaxRetry: 6,
                  fragLoadingRetryDelay: 1000,
                  fragLoadingMaxRetryTimeout: 64000,
                  startFragPrefetch: false,
                  fpsDroppedMonitoringPeriod: 5000,
                  fpsDroppedMonitoringThreshold: 0.2,
                  appendErrorMaxRetry: 3,
                  enableWebVTT: true,
                  enableCEA708Captions: true,
                  stretchShortVideoTrack: false,
                  maxAudioFramesDrift: 1,
                  forceKeyFrameOnDiscontinuity: true,
                  abrEwmaFastLive: 3.0,
                  abrEwmaSlowLive: 9.0,
                  abrEwmaFastVoD: 3.0,
                  abrEwmaSlowVoD: 9.0,
                  abrEwmaDefaultEstimate: 500000,
                  abrBandWidthFactor: 0.95,
                  abrBandWidthUpFactor: 0.7,
                  abrMaxWithRealBitrate: false,
                  maxStarvationDelay: 4,
                  maxLoadingDelay: 4,
                  minAutoBitrate: 0,
                  emeEnabled: false,
                  widevineLicenseUrl: undefined,
              };
            };

            $('#nextchannel').bind('click', function(e) {
              myIPTV.curChannel = myIPTV.curChannel + 1 >= myIPTV.streams.length ? 0 : myIPTV.curChannel + 1;
              myIPTV.loadSelectedStream(myIPTV.streams[myIPTV.curChannel].url);
            });

            $('#prevchannel').bind('click', function(e) {
              myIPTV.curChannel = myIPTV.curChannel - 1 < 0 ? myIPTV.streams.length - 1 : myIPTV.curChannel - 1;
              myIPTV.loadSelectedStream(myIPTV.streams[myIPTV.curChannel].url);
            });

            // var button = $('<a data-role="button" id="btnLogin" href="#login" data-transition="flip" data-icon="ui-icon-plus" data-i18n="btnlogin"
            //        class="ui-btn-right ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-left ui-btn-up-a"
            //        data-corners="true"data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="a">
            //        <span class="ui-btn-inner ui-btn-corner-all">
            //          <span class="ui-btn-text">登录</span>
            //        <span class="ui-icon ui-icon-home ui-icon-shadow">&nbsp;</span></span></a>');
            //                 <a data-role="button" data-inline="true" href="#icons" data-transition="flip" data-icon="ui-icon-plus" data-show-label="false" class="ui-button ui-shadow ui-corner-all ui-button-inline ui-widget ui-button-icon-only ui-button-inherit" role="button" title="Sign Up"><span class="ui-button-icon ui-icon ui-icon-plus"></span><span class="ui-button-icon-space"> </span>Sign Up</a>
            // $('#homeheader').append(button);
            // button = $('<a data-role="button" id="btnSignup" href="#sign_up" data-transition="flip" data-icon="home" data-i18n="btnsingup" class="ui-btn-left ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-left ui-btn-up-a" data-corners="true"data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="a"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">注册</span><span class="ui-icon ui-icon-home ui-icon-shadow">&nbsp;</span></span></a>');
            // $('#homeheader').append(button);
            //
            // W.myIPTV.addButton($('#homeheader'), "#login", "home", '');

            // $('a[href=#contact]').bind('click', function(e) {
            //     console.log('a[href=#contact] is called.');
            //     $.getScript('js/jquery.validate.min.js', function() {
            //         $.getScript('js/contact.js', function() {
            //             $.mobile.hidePageLoadingMsg();
            //         });
            //     });
            // });
            //
            // $('a[href=#login]').bind('click', function(e) {
            //     $.getScript('js/jquery.validate.min.js', function() {
            //         $.getScript('js/login.js', function() {
            //             $.mobile.hidePageLoadingMsg();
            //         });
            //     });
            // });
            //
            // $('a[href=#logout]').bind('click', function(e) {
            //     W.myIPTV.setCookie("jwt", "", 1);
            //     $.mobile.changePage( "#home", {} );
            // });
            //
            // //portfolio gallery pages
            // $('a[href=#portfolio3]').bind('click', function(e) {
            //     var myPhotoSwipe1 = $("#gallery1 a").photoSwipe({ enableMouseWheel: false , enableKeyboard: false });
            // });
            //
            // //portfolio gallery pages
            // $('a[href=#portfolio4]').bind('click', function(e) {
            //     var myPhotoSwipe2 = $("#gallery2 a").photoSwipe({ enableMouseWheel: false , enableKeyboard: false });
            // });
            //
            // //social links - version 1 all links open direct in new window
            // $('#social-links a').bind('click', function(e) {
            //     e.preventDefault();
            //     var sn = $(this).attr('href').replace('#','');
            //     console.log(sn);
            //     W.location = W.myIPTV.SETTINGS.SOCIAL[sn];
            // });
        },
        prevent_default: function(e) {
            e.preventDefault();
        },
        disable_scroll: function() {
            $(D).on('touchmove', myIPTV.prevent_default);
        },
        enable_scroll: function() {
            $(D).unbind('touchmove', myIPTV.prevent_default)
        },
        initStreamList: function () {
          $.get('api/channels.php', data => {
              myIPTV.streams = data['records'];
              alert('成功加载了' + myIPTV.streams.length + '频道。');
              myIPTV.curChannel = 0;
              myIPTV.loadSelectedStream(myIPTV.streams[myIPTV.curChannel].url);
              console.log('curChannel = ' + myIPTV.curChannel);
              var strComp = '<ul data-role="listview" class="swipe-delete ui-listview ui-listview-inset ui-corner-all ui-shadow">';
              myIPTV.streams.forEach(channel => {
                  strComp += '<li class="ui-listview-item"><div class="behind"><a data-role="button" class="ui-btn delete-btn ui-button ui-shadow ui-corner-all ui-widget ui-button-inherit" role="button" id="' + channel.id;
                  strComp += '"><img height="80" width="50" src="images/garbage.png"></a><a data-role="button" class="ui-btn edit-btn pull-left ui-button ui-shadow ui-corner-all ui-widget ui-button-inherit" role="button" id="' + channel.id;
                  strComp += '"><img height="80" width="50" src="images/thumbup.png"></a></div><a href="#home" id="' + channel.id;
                  strComp += '" data-transition="flip" class="ui-listview-item-button ui-button channel' +  + channel.id;
                  strComp += '"><span class="ui-listview-item-icon ui-icon ui-icon-caret-r ui-widget-icon-floatend"></span><div id="wrapper"><div id="left"><img height="72" width="72" src="';
                  strComp += !!channel.logo ? channel.logo : 'images/Changchun.jpg';
                  strComp += '"></div><div id="right"><h2>' + channel.title;
                  strComp += '</h2><p id="description">' + channel.description + '</p></div></div></a></li>';
              });
              var component = $(strComp + '</ul>');
              var x;
              $('#editchannelscontent').append(component);
              $('.swipe-delete li > a')
                  .on('touchstart', function(e) {
                      $('.swipe-delete li > a.open').css('left', '0px').removeClass('open') // close em all
                      $(e.currentTarget).addClass('open')
                      x = e.originalEvent.targetTouches[0].pageX // anchor point
                  })
                  .on('touchmove', function(e) {
                      var change = e.originalEvent.targetTouches[0].pageX - x
                      change = Math.min(Math.max(-100, change), 100) // restrict to -100px left, 0px right
                      e.currentTarget.style.left = change + 'px'
                      if (change < -10) myIPTV.disable_scroll() // disable scroll once we hit 10px horizontal slide
                  })
                  .on('touchend', function(e) {
                      var left = parseInt(e.currentTarget.style.left)
                      var new_left;
                      if (left < -35) {
                          new_left = '-100px'
                      } else if (left > 35) {
                          new_left = '100px'
                      } else {
                          new_left = '0px'
                      }
                      // e.currentTarget.style.left = new_left
                      $(e.currentTarget).animate({left: new_left}, 200)
                      myIPTV.enable_scroll()
                  });

              $('li .delete-btn').on('touchend', function(e) {
                  e.preventDefault();
                  var id = $(this).attr("id");
                  myIPTV.streams = myIPTV.streams.filter(item => { return item.id != id;});
                  $(this).parents('li').slideUp('fast', function() {
                      $(this).remove();
                  })
              })

              $('li .edit-btn').on('touchend', function(e) {
                  e.preventDefault();
                  var id = $(this).attr("id");
                  var theOne = myIPTV.streams.find(item => { return item.id == id;});
                  myIPTV.streams = myIPTV.streams.filter(item => { return item.id != id;});
                  myIPTV.streams.unshift(theOne)
                  $(this).parents('li').parent().prepend($(this).parents('li'));
              })

              $('#editchannels').bind('pageshow', function(e) {
                console.log('myIPTV.curChannel is ' + myIPTV.curChannel);
                if (myIPTV.curChannel > 2) {
                    var headerHeight = $('.swipe-delete li:eq(1)').position().top;
                    var itemHeight = $('.swipe-delete li:eq(2)').position().top - headerHeight;
                    $(D).scrollTop(itemHeight * (myIPTV.curChannel-1));
                    console.log('headerHeight is ' + headerHeight + ' and itemHeight = ' + itemHeight + ' move to ' + itemHeight * myIPTV.curChannel);
                }
                var target = '.channel' + myIPTV.streams[myIPTV.curChannel].id;
                $('.open').css('left', '0px').removeClass('open');
                $('.ui-button-active').removeClass('ui-button-active');
                $(target).addClass('open');
                $(target).addClass('ui-button-active');
              });

              $('li .ui-listview-item-button').on('touchend', function(e) {
                  var id = $(this).attr("id");
                  myIPTV.curChannel = myIPTV.streams.findIndex(item => { return item.id == id;});
                  myIPTV.loadSelectedStream(myIPTV.streams[myIPTV.curChannel].url);
              })
          })
        },
        loadSelectedStream: function (url) {
          var hls = W.hls;
          if (hls) {
            hls.destroy();
            if (hls.bufferTimer) {
              hls.bufferTimer = undefined;
            }
            hls = null;
          }

          console.log('Loading ' + url);
          W.hls = hls = new Hls(W.config);
          hls.attachMedia(video);
          hls.on(Hls.Events.MEDIA_ATTACHED, function(event, data) {
            console.log("video and hls.js are now bound together !" + JSON.stringify(event) + " " + JSON.stringify(data));
            hls.loadSource(url);
            hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
              console.log("manifest loaded, found " + data.levels.length + " quality level"  + JSON.stringify(event) + " " + JSON.stringify(data));
              var playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise.then(_ => {
                  // video.muted = false;
                // setTimeout(() => video.muted = false, 3000);
                }).catch(error => {
                  console.log('catched an error when play video ' + error);
                  video.pause();
                  video.play();
                });
              }
            });

            hls.on(Hls.Events.ERROR, function (event, data) {
              console.log("some errors were found " + JSON.stringify(event) + " " + JSON.stringify(data));
              var errorType = data.type;
              var errorDetails = data.details;
              var errorFatal = data.fatal;

              switch(data.details) {
                case Hls.ErrorDetails.FRAG_LOAD_ERROR:
                  // ....
                  break;
                default:
                  break;
              }
            });
          });
        },
        setCookie: function(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        },
        addButton: function(container, target, icon, position) {
            console.log('addButton()...');
            var element = '<a data-role="button" href="' + target
                      + '" data-transition="flip" data-icon="' + icon
                      + '" data-i18n="btnlogin" class="' + position
                      + ' ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-left ui-btn-up-a" data-corners="true"data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="a"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">登录</span><span class="ui-icon ui-icon-home ui-icon-shadow">&nbsp;</span></span></a>'
            console.log('element is ' + element);
            // var button = $('<a data-role="button" id="btnLogin" href="#login" data-transition="flip" data-icon="home" data-i18n="btnlogin" class="ui-btn-right ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-left ui-btn-up-a" data-corners="true"data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="a"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">登录</span><span class="ui-icon ui-icon-home ui-icon-shadow">&nbsp;</span></span></a>');
            // container.append(button);
        }
    };

    $(D).ready(function() {
        myIPTV.init();
    });

  	$.mobile.i18nEnabled = true;

  	var defaultFolder = "i18n",
        mobile = $.mobile,
        version = mobile.version;

  	mobile.i18n = {
  		/**
  		 * 获得国际化信息
  		 * @param {String} key 国际化信息字符串，如"user.name"
  		 * @param {Object} context 国际化信息上下文，默认为W.i18n
  		 * @method getText
  		 */
  		getText: function( key, context ) {
        console.log('getText()');
  			if( !key || typeof( key ) !== "string" ) return;
  			var parts = key.split("."),
  				obj = context || W.i18n || W;
  			if ( typeof( obj ) !== "object" ) return;
  			for( var i=0, p ; p = parts[i]; i++){
  				obj =  ( p in obj ) ? obj[p] : undefined;
  		        if ( obj === undefined ) return;
  			}

  			return obj;
  		},

  		/**
  		 * 处理某个DOM元素中的国际化标签
  		 * @param {DOM}
  		 * @return {jQuery} 封装后的jQuery对象
  		 */
  		applyI18n: function( ele ){
        console.log('applyI18n()');
  			var $eles = $( ele ),
  				getText = this.getText;
  			if( $eles.length ===0 ) return;

  			var applyContext = function() {
  				var inputs = "input,textarea,select",
  					$this = $( this ),
  					key = $this.attr( "data-i18n" ),
  					value = getText( key ),
  					reg = new RegExp( "\\b" + this.nodeName.toLowerCase() + "\\b" );
  				inputs.match( reg ) ? $this.val( value ) : $this.text( value );
  			};

  			var apply2Ele = function( $ele ) {
  				$ele.children().length === 0 ?
  					$ele.each( applyContext ) :
  					$ele.find( "[data-i18n]" ).each( applyContext );
  			};

  			return $eles.each( function(){
  				var $ele = $(this),
  					isScriptEle = $ele[0].tagName.toLowerCase() === "script",
  					scriptType  = $ele[0].type,
  					$div = $("<div></div>");
  				if( scriptType === "" || scriptType === "text/javascript" ) return;
  				apply2Ele( isScriptEle ? $div.html( $ele.html() ) : $ele );
  				isScriptEle && $ele.html( $div.html() );
  			});
  		},

  		/**
  		 * 获得当前浏览器的语言是否为中文简体
  		 * @return {boolean} 返回 true，如果"zh-CN" or "zh-Hans-CN" and false otherwise
  		 */
  		isSimplifiedChinese: function() {
    // alert('浏览器设定语言为' + W.navigator.language );
        var language =  W.navigator.language.replace("-","_").toUpperCase();
        console.log('Browser language is ' + W.navigator.language);
        console.log('Transformed language is ' + language);
  			return language == 'ZH_CN' || language == 'ZH_HANS_CN';
  		}
  	};

  	var loadJSON = function( folder ) {
      var language = mobile.i18n.isSimplifiedChinese() ? 'zh' : 'en';
  		var url = folder + "/" +　language + ".json";
      // alert('url: ' + url);
      console.log('load JSON for i18n ' + url);
  		$.ajax({
  			url: url,
  			async: false,
  			dataType: "json",
  			success: function( msg ){
  				W.i18n = msg;
  			},
  			error: function(){
  			  console.error("error: Could not find file " +  defaultUrl )
  			}
  		});
  	}, i18n = mobile.i18n;

  	// 检测是否开启国际化，用于可以在$(document).bind("mobileinit",function(){})中进行设置
  	if( mobile.i18nEnabled ) {
  		loadJSON( W.location.origin + W.location.pathname + ( mobile.i18nFolder || defaultFolder ) ) ;

  		// 页面渲染前进行国际化信息替换
  		$(document).bind("pagebeforecreate", function( evt ) {
  			var $page = $( evt.target );
  			i18n.applyI18n( $().add( $page ).add( $page.find( "script" ) ) );
  		});
     } else {
       console.log('mobile is not i18nEnabled');
     }
})(jQuery, window, document);
