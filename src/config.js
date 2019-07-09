

// FLAG UPDATES:
/* v69 https://forum.vivaldi.net/topic/29826/regression-fixes-backend-updates-and-improvements-vivaldi-browser-snapshot-2-0-1295-3/21?page=2

New Stuff:
#overlay-strategies, #enable-webrtc-remote-event-log, #enable-webassembly-threads, #enable-v8-orinoco, #close-buttons-inactive-tabs, #new-tab-button-position, #single-tab-mode, #enable-oop-rasterization, #translate, #enable-heavy-page-capping, #enable-cloud-printer-handler, #enable-web-authentication-ctap2-support, #autofill-prefilled-fields, #autofill-rationalize-repeated-server-predictions, #enable-layout-ng, #enable-sync-user-consent-separate-type, #ntp-custom-links, #enable-websocket-auth-connection-reuse, #enable-accessibility-object-model, #enable-autoplay-ignore-web-audio, #upcoming-ui-features, #enable-blink-heap-incremental-marking, #enable-css-fragment-identifiers, #enable-ephemeral-flash-permission, #infinite-session-restore, #page-almost-idle, #proactive-tab-freeze-and-discard, #site-characteristics-database, #gamepad-polling-rate, #allow-sxg-certs-without-extension, #enable-bloated-renderer-detection

Changed:
#enable-password-generation > #automatic-password-generation, #ignore-previews-blacklist > #ignore-previews-blocklist, A bunch of google pay flags, chrome omnibox stuff, #BundledConnectionHelp

Removed:
#enable-manual-password-generation, #enable-md-extensions, #important-sites-in-cbd, #enable-renderer-side-resource-scheduler, #memory-ablation, #enable-d3d-vsync, #enable-manual-fallbacks-filling, #enable-wheel-scroll-latching

*/


const e = require('electron')
const os = require('os')
const CPU_COUNT = os.cpus().length
const FD_LIMIT = 2048
const SANDBOX = 0
const RASTER_THREADS = -1 //CPU_COUNT
const CHROMIUM_V = 69
const RENDERER_PRIORITY = 1
const SITE_ISOLATION = 0
const EXTERNAL_VIDEO_PLAYER_ONLY = true
const GPU_SANDBOX = 0
const PIXEL_RATIO = 2
const TEXT_HARFBUZZ = 1
const TEXT_SDF = 1
const TEXT_LCD = 1
const FRACTIONAL_SCALE_FACTOR = false
const SCROLL_HORIZ_THRESHOLD = '133'

const IS_MAC = process.platform === 'darwin'
const IS_LINUX = process.platform === 'linux'
const IS_WINDOWS = !IS_MAC && !IS_LINUX

const IS_PACKAGED = e.app.isPackaged
const IS_DEV = process.env.NODE_ENV === 'development'
const IS_PRODUCTION = (function () {
	if (process.env.NODE_ENV === 'production') return true
	if (!process.versions.electron) return false
	if (process.platform === 'darwin') return !/\/Electron\.app\//.test(process.execPath)
	if (process.platform === 'win32') return !/\\electron\.exe$/.test(process.execPath)
	if (process.platform === 'linux') return !/\/electron$/.test(process.execPath)
})()

if (IS_DEV) {
	console.log({
		IS_PACKAGED,
		IS_DEV,
		IS_PRODUCTION,
		CPU_COUNT,
		IS_MAC
	})
}

e.app.once('ready', function () {
	// register_shortcuts()
})

// e.app.once('quit', function () {
// 	unregister_shortcuts()
// })

// let IS_SHORTCUTS_REGISTERED = false
// function register_shortcuts() {
//     if (IS_SHORTCUTS_REGISTERED) return

//     const SHORTCUTS = (global.M)
//     ? {
//     'Alt+Cmd+I': function() { M.Window.toggleDevTools( ':focused' ) },
//     'Alt+Cmd+J': function() { M.Window.toggleDe6vTools_w( ':focused' ) },
//     'Alt+Cmd+K': function() { M.Window.toggleDevTools_v( ':focused' ) },
//     //shortcut.register('Ctrl+Cmd+Alt+M', function() { win.setIgnoreMouseEvents(!(swtch ^= 1)) })
//     }
//     : {}

//     const ACCELERATORS = Object.keys(SHORTCUTS)




// 	IS_SHORTCUTS_REGISTERED = true
// 	try {
// 		for (let i = 0; i < ACCELERATORS.length; i = i + 1) {
// 			const accelerator = ACCELERATORS[i]
// 			const fn = SHORTCUTS[accelerator]
// 			e.globalShortcut.register(accelerator, fn)
// 		}
// 	}
// 	catch(e) {
// 		IS_SHORTCUTS_REGISTERED = false
// 	}
// }
// function unregister_shortcuts() {
// 	try {
// 		e.globalShortcut.unregisterAll()
// 		IS_SHORTCUTS_REGISTERED = false
// 	}
// 	catch(e) {}
// }

function done() {
	_features_to_clarg()
}
function clarg(a1,a2) {
	if (a2 === undefined) e.app.commandLine.appendSwitch(a1)
	else e.app.commandLine.appendSwitch(a1, a2)
}
const features = []
const blink_features = []
const disable_features = []
function enable(feature) {
	if (features.indexOf(feature) >> 31)
		features[features.length] = feature
}
function blink(feature) {
	if (blink_features.indexOf(feature) >> 31)
		blink_features[blink_features.length] = feature
}
function disable(feature) {
	if (disable_features.indexOf(feature) >> 31)
		disable_features[disable_features.length] = feature
}
function _features_to_clarg() {
	if (features.length)
		clarg('enable-features', features.join(','))
	if (blink_features.length)
		clarg('enable-blink-features', blink_features.join(','))
	if (disable_features.length)
		clarg('disable-blink-features', disable_features.join(','))
}
// disable-blink-features

configure().then(done)
async function configure() {

	if (typeof process.setFdLimit === 'function') {
		process.setFdLimit(FD_LIMIT);
	}

	e.app.on('web-contents-created', IS_DEV
		? function(event, wc) {
			// console.log(1111111 + ' ' + )
			// if (e.BrowserWindow.fromWebContents(wc)) {
			// }
			wc.openDevTools()
			wc.setWebRTCIPHandlingPolicy('default_public_interface_only')
		}
		: function(e, wc) {
			wc.setWebRTCIPHandlingPolicy('default_public_interface_only')
		}
	)

	// clarg('proxy-server','127.0.0.1:8888')
	// clarg('host-resolver-rules','MAP * ~NOTFOUND , EXCLUDE 127.0.0.1')

	/*
		https://malwaretips.com/threads/list-of-interesting-experimental-flags-for-google-chrome.41686/
		https://groups.google.com/forum/#!forum/chromium-command-line-updates
		https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md
		https://wiki.mikejung.biz/Chrome

		Blink Features
		https://www.chromium.org/blink/runtime-enabled-features
		https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5
	*/

	if (IS_WINDOWS) process.env.OS_WIN = true
	else if (IS_MAC) process.env.OS_MACOSX = true
	process.env.ENABLE_PACKAGE_MASH_SERVICES = true

	clarg('no-first-run')
	clarg('no-default-browser-check')

	// clarg('dom-automation') // ??

	clarg('enable-viewport') // Enables the use of the @viewport CSS rule, which allows pages to control aspects of their own layout. This also turns on touch-screen pinch gestures. ↪

	// blink('IDBObserver')
	// blink('IntersectionObserver')
	// IntersectionObserverV2
	// ResizeObserver
	// WebAnimationsAPI
	// WebAnimationsSVG
	// WebAssemblyStreaming
	// blink('TimerThrottlingForHiddenFrames')
	// blink('LayoutNG')
	// blink('LayoutNGFragmentCaching')
	// blink('LayoutNGPaintFragments')
	// LazyInitializeMediaControls
	// blink('LazyParseCSS')
	// ShadowPiercingDescendantCombinator
	// CSSDisplayContents
	// CSSEnvironmentVariables
	// CSSBackdropFilter
	// CSSFocusVisible
	// CSSInBodyDoesNotBlockPaint
	// CSSVariables2
	// CSSViewport
	// DeepCombinatorInCSSDynamicProfile
	// CustomElementsBuiltin
	// StackedCSSPropertyAnimations
	// MediaSourceExperimental
	// MediaStreamSpeech
	// MemoryInfoInWorkers
	// ModuleScripts
	// MultipleColorStopPositions
	// JankTracking
	// 		Tracks "jank" from layout objects changing their visual location
    // 		between animation frames (see crbug.com/581518).
	// ExperimentalShouldYield
	// 		* Enables the attribute `performance.shouldYield` in windows. This
	// 		* attribute indicates that the frame should pause its current task so
	// 		* that the browser can perform some high priority work. See
	// 		* https://crbug.com/836310.

	//enable-blink-heap-incremental-marking,
	// Enable incremental marking for Blink's heap managed by the Oilpan garbage collector.

	// clarg('enable-v8-orinoco')
	//		-- appears to be concurrent garbage collection

	blink('ExperimentalV8Extras')

	clarg('enable-future-v8-vm-features')
	// 		This enables upcoming and experimental V8 VM features. This flag does not enable experimental JavaScript features. – Mac, Windows, Linux, Chrome OS, Android

	// Enable ECMAScript 6 modules import.meta.url
	// Enables ECMAScript 6 modules import.meta.url syntax support in V8 and Blink. – Mac, Windows, Linux, Chrome OS, Android
	// enable-module-scripts-import-meta-url

	blink('RenderingPipelineThrottling')
	blink('TimerThrottlingForHiddenFrames')

	if (!IS_DEV) {
		clarg('v8-cache-options','code')
		//		⊗	Set options to cache V8 data. (off, preparse data, or code) ↪
		clarg('v8-cache-strategies-for-cache-storage','aggressive')
		//		⊗ Set strategies to cache V8 data in CacheStorage.
		//		* (off, normal, or aggressive)
	}

	// clarg('aggressive-cache-discard')
	clarg('javascript-harmony');
	clarg('enable-javascript-harmony');
	clarg('enable-experimental-web-platform-features');

	// clarg('enable-memory-coordinator');

	// clarg('enable-tab-audio-muting');

	// SECURITY!
	clarg('reduced-referrer-granularity');
	// If a page hasn't set an explicit referrer policy, setting this flag will reduce the amount of information in the 'referer' header for cross-origin requests. – Mac, Windows, Linux, Chrome OS, Android

	// SECURITY!
	clarg('disable-hyperlink-auditing')

	// clarg('no-referrers') // ??

	clarg('enable-brotli');

	// clarg('enable-token-binding');

	// clarg('expensive-background-timer-throttling');

	// Enable ECMAScript 6 modules dynamic import
	// Enables ECMAScript 6 modules dynamic "import" syntax support in V8 and Blink. – Mac, Windows, Linux, Chrome OS, Android
	// #enable-module-scripts-dynamic-import

	// V8ContextSnapshot
	clarg('enable-v8-context-snapshot');
	//	ets to use a snapshot to create V8 contexts in frame creation. – Mac, Windows, Linux, Android
	// 		https://www.npmjs.com/search?q=mksnapshot
	// 		https://github.com/atom/electron-link

	// blink('CSSGridLayout')
		// CSSApplyAtRules,CSS3Text,CSS3TextDecorations,CSSAdditiveAnimations
		// CSSBackdropFilter,CSSDisplayContents,CSSFontDisplay,CSSFontSizeAdjust
		// CSSGridLayout,CSSInBodyDoesNotBlockPaint,CSSIndependentTransformProperties,CSSLineBreak
		// CSSMaskSourceType,CSSOffsetPathRay,CSSOffsetPathRayContain
		// CSSPaintAPI,Worklet,CSSPaintAPIArguments
		// ,CSSSelectorsFocusWithin
		// https://chromium.googlesource.com/chromium/src.git/+/62.0.3202.58/third_party/WebKit/Source/platform/RuntimeEnabledFeatures.json5
		// Enable one or more Blink runtime-enabled features. Use names from RuntimeEnabledFeatures.json5, separated by commas. Applied before kDisableBlinkFeatures, and after other flags that change these features. ↪


	// Start the renderer with an initial virtual time override specified in
	// seconds since the epoch.
	//const char kInitialVirtualTime[] = "initial-virtual-time";


	/* Google ================================================================================ */

	process.env.GOOGLE_API_KEY = 'AIzaSyBT7VIk5PhjiKcm4bFCkE9ZwEOaFam1VjE'
	//--google-url
	//--google-apis-url
	//--google-doodle-url ⊗ Overrides the URL used to fetch the current Google Doodle. Example: https://www.google.com/async/ddljson ↪
	//--google-base-url ⊗	Specifies an alternate URL to use for speaking to Google. Useful for testing. ↪
	//--google-doodle-url ⊗ Overrides the URL used to fetch the current Google Doodle. Example: https://www.google.com/async/ddljson ↪
	//--cryptauth-http-host ⊗	Overrides the default URL for Google APIs (https://www.googleapis.com) used by CryptAuth. ↪
	// --enable-google-now-integration // Enables Google Now integration.
	// --google-search-domain-check-url // Specifies an alternate URL to use for retrieving the search domain for Google. Useful for testing.


	/* Experimental ================================================================================ */

	clarg('pause-background-tabs') //>

	// Top document isolation
	// Highly experimental performance mode where cross-site iframes are kept in a separate process from the top document. In this mode, iframes from different third-party sites will be allowed to share a process. – Mac, Windows, Linux, Chrome OS, Android
	clarg('enable-top-document-isolation')

	// REMOVED v69
	// Memory ablation experiment -- Allocates extra memory in the browser process. – Mac, Windows, Linux, Chrome OS, Android
	// clarg('memory-ablation')

	clarg('enable-lazy-frame-loading')

	// Enable new preconnect predictor – Mac, Windows, Linux, Chrome OS, Android
	// Enable the new implementation of preconnect and DNS preresolve.
	//		"Learning" means that only database construction is enabled,
	//		"Preconnect" enables both learning and preconnect and disables the existing implementation.
	//		"No preconnect" disables both implementations.
	clarg('enable-new-preconnect', 'Preconnect')

	// Enable System Share Menu
	// Enables sharing via macOS share extensions. – Mac
	if (IS_MAC) clarg('mac-system-share-menu')

	// --browser-subprocess-path //	Path to the exe to run for the renderer and plugin subprocesses. ↪

	// --shared-files // Describes the file descriptors passed to a child process in the following list format: <file_id>:<descriptor_id>,<file_id>:<descriptor_id>,... where <file_id> is an ID string from the manifest of the service being launched and <descriptor_id> is the numeric identifier of the descriptor for the child process can use to retrieve the file descriptor from the global descriptor table. ↪

	// --enable-webview-variations
	// --note-taking-app-ids ⊗	An optional comma-separated list of IDs of apps that can be used to take notes. If unset, a hardcoded list is used instead. ↪
	// --enable-tablet-splitview // Enables the split view on tablet mode. ↪
	// WebVR WebVRExperimentalRendering
	clarg('enable-webvr') // Enables interaction with virtual reality devices. ↪
	// --ntp-snippets-add-incomplete ⊗	If this flag is set, we will add downloaded snippets that are missing some critical data to the list. ↪
	// --enable-spotlight-actions ⊗	Enables the Spotlight actions. ↪
	// --enable-supervised-user-managed-bookmarks-folder ⊗	Enables the supervised user managed bookmarks folder. ↪
	// blink('AsyncClipboard')

	/* Payment, Account & Security ================================================================================ */

	// PaymentApp, PaymentDetailsModifierData, PaymentRequest, PaymentRequestBasicCard, PaymentRetry
	clarg('enable-offer-store-unmasked-wallet-cards')
	// 		* Force showing the local save checkbox in the autofill dialog box for getting the full credit card number for a wallet card. ↪
	clarg('enable-offer-upload-credit-cards')
	// 		* Enables offering to upload credit cards. ↪
	//clarg('keychain-reauthorize')
	// 		* Performs Keychain reauthorization from the command line on behalf of a special Keychain reauthorization stub executable.
	//		* Used during auto-update.


	/* Browser ================================================================================ */

	// Offline
	// https://cs.chromium.org/chromium/src/components/offline_pages/core/offline_page_feature.h?g=0
	// clarg('enable-offline-auto-reload')
	// 		⊗ Enable auto-reload of error pages if offline. ↪
	// clarg('enable-offline-auto-reload-visible-only')
	// 		⊗ Only auto-reload error pages when the tab is visible. ↪
	clarg('show-saved-copy')

	// clarg('history-entry-requires-user-gesture')
	// 		* Don't allow content to arbitrarily append to the back/forward list. The page must prcoess a user gesture before an entry can be added. ↪
	clarg('passive-listeners-default','documentonlytrue')
	// 	Override the default value for the 'passive' field in javascript addEventListener calls.
	// 	Values are defined as:
	// 			'documentonlytrue' to set the default be true only for document level nodes.
	// 			'true' to set the default to be true on all nodes (when not specified).
	// 			'forcealltrue' to force the value on all nodes. ↪


	clarg('enable-file-cookies')
	clarg('allow-file-access-from-files')
	// 		* By default, file:// URIs cannot read other file:// URIs. This is an override for developers who need the old behavior for testing.
	//		* By default, cookies are not allowed on file://. They are needed for testing, for example page cycler and layout tests. See bug 1157243.

	// https://bugs.chromium.org/p/chromium/issues/detail?id=12754
	// clarg('enable-nostate-prefetch'); // Also known as “prerendering“, the Prefetch feature in Google Chrome will cache pages that are linked on the web page you are currently on. This allows the page to load a bit faster when accessing it.
	// --hidden

	// clarg('make-default-browser')
	// --app ⊗	Specifies that the associated value should be launched in "application" mode. ↪
	// --app-auto-launched ⊗	Specifies whether an app launched in kiosk mode was auto launched with zero delay. Used in order to properly restore auto-launched state during session restore flow. ↪
	// --app-shell-user ⊗	User email address of the current user. ↪
	// --headless ⊗	Run in headless mode, i.e., without a UI or display server dependencies. ↪
	// --extension-process ⊗	Marks a renderer as extension process. ↪
	// --dump-dom ⊗	Instructs headless_shell to print document.body.innerHTML to stdout. ↪
	// --dark_vibrant
	// --dark_muted
	// --disable-popup-blocking Disable pop-up blocking.
	// --enable-ntp-most-likely-favicons-from-server ⊗	Enables the new Google favicon server for fetching favicons for Most Likely tiles on the New Tab Page. ↪
	// --enable-ntp-popular-sites ⊗	Enables showing popular sites on the NTP. ↪
	// --enable-ntp-search-engine-country-detection ⊗	Enables using the default search engine country to show country specific popular sites on the NTP. ↪
	// --version ⊗

	// --silent-launch ⊗	Causes Chrome to launch without opening any windows by default. Useful if one wishes to use Chrome as an ash server. ↪
	// --restore-last-session ⊗	Indicates the last session should be restored on startup. This overrides the preferences value. Note that this does not force automatic session restore following a crash, so as to prevent a crash loop. This switch is used to implement support for OS-specific "continue where you left off" functionality on OS X and Windows. ↪
	// --user-data-dir ⊗	Directory where the browser stores the user profile. ↪
	// N/A // clarg('homepage','http://google.com') // Specifies which page will be displayed in newly-opened tabs. We need this for testing purposes so that the UI tests don't depend on what comes up for http://google.com. ↪

	// clarg('enable-nacl')
	//https://www.chromium.org/nativeclient


	/* Interaction ================================================================================ */

	clarg('autoplay-policy', 'no-user-gesture-required') // allow autoplay by default

	// blink('PassiveEventListenersDueToFling')
	// blink('GamepadExtensions')
	// GamepadVibration
	// clarg('no-user-gesture-required')
	// 		⊗ Autoplay policy that does not require any user gesture. ↪
	// clarg('enable-touchpad-three-finger-click')
	//		⊗ Enables touchpad three-finger-click as middle button. ↪
	clarg('touch-events') // TouchEventFeatureDetection
	clarg('enable-pinch')

	/*
	// 		* Enables compositor-accelerated touch-screen pinch gestures. ↪
	clarg('compensate-for-unstable-pinch-zoom')
	*/
	// 		* Enable compensation for unstable pinch zoom. Some touch screens display significant amount of wobble when moving a finger in a straight line. This makes two finger scroll trigger an oscillating pinch zoom. See crbug.com/394380 for details. ↪
	clarg('enable-touch-drag-drop')

	// 		⊗ Enables touch event based drag and drop. ↪
	// --enable-touchview
	//		⊗ Enables the observation of accelerometer events to enter touch-view mode. ↪
	// --force-enable-stylus-tools
	//		⊗ Enables the stylus tools next to the status area. ↪
	// clarg('enable-spatial-navigation')
	// 		* https://developer.vewd.com/display/OTV/Tweaking+Spatial+Navigation+for+TV+Browsing
	// 		* https://developer.mozilla.org/en-US/docs/Web/CSS/@viewport


	// clarg('ash-animate-from-boot-splash-screen')
	// clarg('ash-enable-palette-on-all-displays')
	// // --browser-startup-dialog ⊗
	// clarg('ash-touch-hud')
	// clarg('ash-enable-unified-desktop')

	/* Scrolling ================================================================================ */

	// ScrollCustomization
	// TouchpadAndWheelScrollLatching
	// --overscroll-history-navigation ⊗	Controls the behavior of history navigation in response to horizontal overscroll. Set the value to '0' to disable. Set the value to '1' to enable the behavior where pages slide in and out in response to the horizontal overscroll gesture and a screenshot of the target page is shown. Set the value to '2' to enable the simplified overscroll UI where a navigation arrow slides in from the side of the screen in response to the horizontal overscroll gesture. Defaults to '1'. ↪
	clarg('overscroll-start-threshold',SCROLL_HORIZ_THRESHOLD) //⊗	Controls the value of the threshold to start horizontal overscroll relative to the default value. E.g. set the value to '133' to have the overscroll start threshold be 133% of the default threshold. ↪
	// --hide-scrollbars ⊗	Hide scrollbars from screenshots. ↪
	// CSSScrollSnapPoints,CSSScrollBoundaryBehavior,CSSOMSmoothScroll,CSSOffsetPositionAnchor

	// clarg('enable-fast-web-scroll-view-insets')
	// blink('CSSOMSmoothScroll')
	// SmoothScrollJSIntervention
	// clarg('enable-smooth-scrolling')
	clarg('enable-scroll-prediction')
	// 		* Tries to predict the final location of the finger while scrolling on touch-supporting devices so
	//			that the visible contents at that location get rendered before the finger is there.

	// Scroll Anchor Serialization
	// Save the scroll anchor and use it to restore the scroll position when navigating. – Mac, Windows, Linux, Chrome OS, Android
	// clarg('enable-scroll-anchor-serialization')

	/* Metrics & Notifications ================================================================================ */

	// enable-push-api-background-mode
	// 		Enable Push API background mode
	// 		Enable background mode for the Push API. This allows Chrome to continue running after the last window is closed, and to launch at OS startup, if the Push API needs it. – Mac, Windows, Linux

	// --log-net-log=path
	// 		Enables net log events to be saved and writes them to path.


	// TODO: clarg('track-active-visit-time')
	//		* Enables tracking the amount of non-idle time spent viewing pages.
	// clarg('show-fps-counter');
	// clarg('enabled-new-style-notification')
	// 		* Flag to enable or disable new-style notification. This flag will be removed once the feature gets stable. ↪
	// clarg('enable-push-api-background-mode')
	// 		* Enable background mode for the Push API. ↪
	// clarg('override-metrics-upload-url')
	// 		* Override the URL to which metrics logs are sent for debugging. ↪
	// --net-log-capture-mode ⊗	Sets the granularity of events to capture in the network log. The mode can be set to one of the following values: "Default" "IncludeCookiesAndCredentials" "IncludeSocketBytes" See the functions of the corresponding name in net_log_capture_mode.h for a description of their meaning. ↪
	// --enable-logging ⊗	Controls whether console logging is enabled and optionally configures where it's routed. ↪
	// --enable-navigation-tracing ⊗	Enables tracing for each navigation. It will attempt to trace each navigation for 10s, until the buffer is full, or until the next navigation. It only works if a URL was provided by --trace-upload-url. ↪
	// --enable-net-benchmarking ⊗	Enables the network-related benchmarking extensions. ↪
	// --enable-network-information-downlink-max ⊗	Enables the type, downlinkMax attributes of the NetInfo API. Also, enables triggering of change attribute of the NetInfo API when there is a change in the connection type. ↪
	// --force-enable-metrics-reporting ⊗	Forces metrics reporting to be enabled. ↪
	// --enable-user-metrics[7] ⊗	Enable user metrics from within the installer. ↪
	// --enable-web-notification-custom-layouts ⊗	Enables Web Notification custom layouts. ↪
	// --force-happiness-tracking-system ⊗	Force enables the Happiness Tracking System for the device. This ignores user profile check and time limits and shows the notification every time for any type of user. Should be used only for testing. ↪


	/* Dev & Debug ================================================================================ */

	if (IS_DEV) {
		clarg('enable-devtools-experiments')
		clarg('enable-logging','stderr')
	}
	// --enable-ui-devtools ⊗	Enables DevTools server for UI (mus, ash, etc). Value should be the port the server is started on. Default port is 9332. ↪
	// --dump-browser-histograms ⊗	Requests that a running browser process dump its collected histograms to a given file. The file is overwritten if it exists. ↪
	// --custom-devtools-frontend ⊗	Specify a custom path to devtools for devtools tests ↪
	// --auto-open-devtools-for-tabs ⊗	This flag makes Chrome auto-open DevTools window for each tab. It is intended to be used by developers and automation to not require user interaction for opening DevTools. ↪
	// --custom-devtools-frontend ⊗	Specify a custom path to devtools for devtools tests ↪
	// --debug-devtools ⊗	Run devtools tests in debug mode (not bundled and minified) ↪
	// --devtools-flags ⊗	Passes command line parameters to the DevTools front-end. ↪

	// --remote-debugging-socket-fd ⊗	The given value is the fd of a socket already opened by the parent process. This allows automation to provide a listening socket for clients to connect to before chrome is fully fired up. In particular, a parent process can open the port, exec headles chrome, and connect to the devtools port immediately. Waiting for chrome to be ready is then handled by the first read from the port, which will block until chrome is ready. No polling is needed. ↪
	// --remote-debugging-targets ⊗	Porvides a list of addresses to discover DevTools remote debugging targets. The format is <host>:<port>,...,<host>:port. ↪
	// --remote-debugging-socket-name[6] ⊗	Enables remote debug over HTTP on the specified socket name. ↪
	// --remote-debugging-port ⊗	Enables remote debug over HTTP on the specified port. ↪

	// clarg('js-flags',"--trace-deopt") //--trace-opt:
	// 		http://benediktmeurer.de/2016/10/11/the-case-of-temporary-objects-in-chrome/
	// 		--allow-natives-syntax --expose-gc --trace-gc --trace-opt --trace-deopt
	// 		--js-flags="--trace-opt --trace-deopt --trace-bailout"
	// 		-js-flags="--help"
	//		--experimental-modules https://nodejs.org/api/esm.html
	// 		--experimental-worker
	//		--opt (use adaptive optimizations)
	//			type: bool  default: true
	//		--always_opt (always try to optimize functions)
	//			type: bool  default: false
	//		--always_osr (always try to OSR functions)
	//			type: bool  default: false
	//		--prepare_always_opt (prepare for turning on always opt)
	//			type: bool  default: false
	//		--trace_deopt (trace optimize function deoptimization)
	//			type: bool  default: false
	//		--trace_stub_failures (trace deoptimization of generated code stubs)
	//			type: bool  default: false
	// 		--trace_opt_stats (trace lazy optimization statistics)
	// 			type: bool  default: false


	// https://github.com/tc39/ecmascript_sharedmem
	// https://floitsch.blogspot.com/2012/03/optimizing-for-v8-introduction.html
	// blink('SharedArrayBuffer')
	// const js_SharedArrayBuffer = '--harmony-sharedarraybuffer'

	// clarg('js-flags', `--fast-math --harmony`)// --experimental-extras --enable-experimental-builtins  ${js_SharedArrayBuffer}`)
	// --es-staging
	if (SANDBOX) {
		if (IS_MAC) clarg('mac-v2-sandbox')
		// For some js-flags it is also ecessary to disable the sandbox as so: --no-sandbox
		// Mac V2 Sandbox
		// Eliminates the unsandboxed warmup phase and sandboxes processes for their entire life cycle. – Mac
	}
	else {
		clarg('no-sandbox')
	}




	// --turbo-instruction-scheduling
	// stress-inline
	// enable_experimental_builtins
	// expose_free_buffer
	// fast_promotion_new_space
	// allow_unsafe_function_constructor
	// expose_async_hooks

	// https://nodesource.com/blog/why-the-new-v8-is-so-damn-fast/
	// ~~~~~~~~~~~~~
	// https://github.com/thlorenz/v8-perf

	// --allow-natives-syntax https://twitter.com/bmeurer/status/938353947592544256
	// https://github.com/NathanaelA/v8-Natives

	// https://github.com/TooTallNate/node-weak
	// https://www.npmjs.com/package/fragile
		// --expose-gc --allow-natives-syntax

	// http://benediktmeurer.de/2017/06/29/javascript-optimization-patterns-part2/

	// https://stackoverflow.com/questions/14863010/how-can-signs-be-used-in-identifiers

	// https://v8.dev/docs/turbofan
	// --turbo_inlining (enable inlining in TurboFan)
	// 	type: bool  default: true
	// --trace_turbo_inlining (trace TurboFan inlining)
	// 	type: bool  default: false
	// --turbo_inline_array_builtins (inline array builtins in TurboFan code)
	// 	type: bool  default: false

	// --fast_math (faster (but maybe less accurate) math functions)
	// 	type: bool  default: true

	// --es_staging (enable test-worthy harmony features (for internal use only))
	// 	type: bool  default: false
	// --harmony (enable all completed harmony features)
	// 	type: bool  default: false
	// --experimental_extras (enable code compiled in via v8_experimental_extra_library_files)
	// 	type: bool  default: false
	// --harmony_dynamic_import (enable "harmony dynamic import")
	// 	type: bool  default: false
	// --use_strict (enforce strict mode)
	// 	type: bool  default: false

	// --lazy (use lazy compilation)
	// 	type: bool  default: true
	// --expose_natives_as (expose natives in global object)
	// 	type: string  default: NULL
	// --wasm_opt (enable wasm optimization)
	// 	type: bool  default: false
	// --expose_wasm (expose wasm interface to JavaScript)
	// 	type: bool  default: true
	// --assume_asmjs_origin (force wasm decoder to assume input is internal asm-wasm format)
	// 	type: bool  default: false
	// --wasm_disable_structured_cloning (disable wasm structured cloning)
	// 	type: bool  default: false
	// --wasm_num_compilation_tasks (number of parallel compilation tasks for wasm)
	// 	type: int  default: 10
	// --wasm_async_compilation (enable actual asynchronous compilation for WebAssembly.compile)
	// 	type: bool  default: false
	// --wasm_max_mem_pages (maximum memory size of a wasm instance)
	// 	type: uint  default: 32767
	// --wasm_max_table_size (maximum table size of a wasm instance)
	// 	type: uint  default: 10000000
	// --dump_wasm_module (dump wasm module bytes)
	// 	type: bool  default: false
	// --dump_wasm_module_path (directory to dump wasm modules to)
	// 	type: string  default: NULL
	// --typed_array_max_size_in_heap (threshold for in-heap typed array)
	// 	type: int  default: 64
	// --experimental_wasm_simd (enable prototype simd opcodes for wasm)
	// 	type: bool  default: false
	// --experimental_wasm_eh (enable prototype exception handling opcodes for wasm)
	// 	type: bool  default: false
	// --experimental_wasm_mv (enable prototype multi-value support for wasm)
	// 	type: bool  default: false
	// --experimental_wasm_threads (enable prototype threads for wasm)
	// 	type: bool  default: false



	// --crash-on-hang-threads=UI:3:18,IO:3:18 --> Crash the browser if UI or IO is not responsive for 18 seconds and the number of browser threads that are responding is less than or equal to 3.
	process.on('unhandledRejection', (reason, p) => {
		console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
	})
	// --crash-on-hang-threads // Comma-separated list of BrowserThreads that cause browser process to crash if the given browser thread is not responsive. UI,IO,DB,FILE,CACHE are the list of BrowserThreads that are supported.


	/* EXTENSIONS ================================================================================*/

	clarg('enable-plugins')
	clarg('allow-http-screen-capture')
	// 		* Allow non-secure origins to use the screen capture API and the desktopCapture extension API. ↪
	clarg('allow-http-background-page')
	// 		* Allows non-https URL for background_page for hosted apps. ↪
	clarg('enable-experimental-extension-apis')
	// 		* Enables extension APIs that are in development.
	clarg('always-authorize-plugins')
	// 		* Prevents Chrome from requiring authorization to run certain widely installed but less commonly used plug-ins.
	// 		* safe for us b/c extensions are not really a thing in electron
	// --disable-extensions-file-access-check ⊗	Disable checking for user opt-in for extensions that want to inject script into file URLs (ie, always allow it). This is used during automated testing. ↪
	// --allow-nacl-crxfs-api[4] ⊗	Specifies comma-separated list of extension ids or hosts to grant access to CRX file system APIs. ↪
	// --allow-nacl-file-handle-api[4] ⊗ Specifies comma-separated list of extension ids or hosts to grant access to file handle APIs. ↪
	// --allow-nacl-socket-api[4] ⊗	Specifies comma-separated list of extension ids or hosts to grant access to TCP/UDP socket APIs. ↪
	// --allow-scripting-gallery Allows injecting extensions and user scripts on the extensions gallery site. Normally prevented for security reasons, but can be useful for automation testing of the gallery.
	// --easy-off-store-extension-install Enables extensions to be easily installed from sites other than the web store. Without this flag, they can still be installed, but must be manually dragged onto chrome://extensions/.
	// --disable-instant-extended-api Disable checking for user opt-in for extensions that want to inject script into file URLs (ie, always allow it). This is used during automated testing.
	// --load-extension Loads an extension from the specified directory.
	// --custom-launcher-page ⊗	Specifies the chrome-extension:// URL for the contents of an additional page added to the app launcher. ↪
	// --embedded-extension-options ⊗ Enables extension options to be embedded in chrome://extensions rather than a new tab. ↪
	// --enable-embedded-extension-options ⊗ Hack so that feature switch can work with about_flags. See kEnableScriptsRequireAction. ↪
	// --extensions-multi-account ⊗	Enables multiple account versions of chrome.identity APIs. ↪
	// --extensions-not-webstore ⊗ Specifies a comma-separated list of extension ids that should be forced to be treated as not from the webstore when doing install verification. ↪
	// --extensions-on-chrome-urls ⊗ Enables extensions running scripts on chrome:// URLs. Extensions still need to explicitly request access to chrome:// URLs in the manifest. ↪
	// --extensions-update-frequency ⊗ Frequency in seconds for Extensions auto-update. ↪
	// --load-extension ⊗ Comma-separated list of paths to extensions to load at startup. ↪
	// --load-and-launch-app ⊗ Loads an app from the specified directory and launches it. ↪
	// --load-apps ⊗ Comma-separated list of paths to apps to load at startup. The first app in the list will be launched. ↪
	// --pack-extension ⊗ Packages an extension to a .crx installable file from a given directory. ↪
	// --pack-extension-key ⊗ Optional PEM private key to use in signing packaged .crx. ↪
	// --whitelisted-extension-id ⊗	Adds the given extension ID to all the permission whitelists. ↪
	// --apps-gallery-download-url ⊗ The URL that the webstore APIs download extensions from. Note: the URL must contain one '%s' for the extension ID. ↪
	// --apps-gallery-update-url ⊗ The update url used by gallery/webstore extensions. ↪
	// --apps-gallery-url ⊗	The URL to use for the gallery link in the app launcher. ↪
	// --always-authorize-plugins ⊗	Prevents Chrome from requiring authorization to run certain widely installed but less commonly used plugins. ↪
	// --custom-launcher-page ⊗	Specifies the chrome-extension:// URL for the contents of an additional page added to the app launcher. ↪
	// --enable-fullscreen-app-list ⊗ If set, fullscreen app list will be enabled as if the feature flag was set. ↪


	/* WebRTC, Audio & Video ================================================================================ */

	process.env.ENABLE_WEBRTC = true

	// Configure the maximum CPU time percentage of a single core that can be
	// consumed for desktop capturing. Default is 50. Set 100 to disable the
	// throttling of the capture.
	// const char kWebRtcMaxCpuConsumptionPercentage[] =
	// "webrtc-max-cpu-consumption-percentage";

	// clarg('allow-loopback-in-peer-connection') // https://codereview.chromium.org/181503012

	// SUPPORTED #enable-webrtc-h264-with-openh264-ffmpeg
	// https://github.com/electron/electron/issues/6549
	// WebRTC H.264 software video encoder/decoder
	// When enabled, an H.264 software video encoder/decoder pair is included. If a hardware encoder/decoder is also available it may be used instead of this encoder/decoder. – Mac, Windows, Linux, Chrome OS


	clarg('enable-webrtc-new-encode-cpu-load-estimator')
	// Enable new estimator for the encoder cpu load, for evaluation and testing. Intended to improve accuracy when screen casting. – Mac, Windows, Linux, Chrome OS, Android

	// WebRtcUseEchoCanceller3
	// RtcPeerConnectionId
	// RTCRtpSenderParameters
	// RTCUnifiedPlan
	// RTCUnifiedPlanByDefault
	// blink('RTCUnifiedPlanByDefault')
	// https://webrtc.org/web-apis/chrome/unified-plan/
	// 		Enables the use of |RTCConfiguration::sdpSemantics| to override the
	// 		default SDP semantics at RTCPeerConnection construction.

	blink('ExperimentalHardwareEchoCancellation')
	// https://groups.google.com/forum/#!msg/discuss-webrtc/nDdDqIBtFBM/bf_0eknmAwAJ

	// clarg('webrtc-stun-probe-trial')
	// 		[13] ⊗ Renderer process parameter for WebRTC Stun probe trial to determine the interval. Please see SetupStunProbeTrial in chrome_browser_field_trials_desktop.cc for more detail. ↪

	clarg('enable-webrtc-stun-origin')
	//		[13] ⊗ Enables Origin header in Stun messages for WebRTC. ↪


	// clarg('enable-webrtc-srtp-aes-gcm')
	// 		[13] ⊗ Enables negotiation of GCM cipher suites from RFC 7714 for SRTP in WebRTC. See https://tools.ietf.org/html/rfc7714 for further information. ↪

	clarg('enable-webrtc-srtp-encrypted-headers')
	// Enables negotiation of encrypted header extensions from RFC 6904 for SRTP
	// in WebRTC.
	// See https://tools.ietf.org/html/rfc6904 for further information.

	clarg('enforce-webrtc-ip-permission-check')
	//https://groups.google.com/forum/#!topic/discuss-webrtc/_5hL0HeBeEA
	// Enforce IP Permission check. TODO(guoweis): Remove this once the feature is
	// not under finch and becomes the default.

	// !
	// clarg('force-webrtc-ip-handling-policy',
	// 	// 'default_public_interface_only'
	// 	'disable_non_proxied_udp'
	// )
	// https://github.com/EFForg/privacybadger/pull/969/files
	// Override WebRTC IP handling policy to mimic the behavior when WebRTC IP
	// handling policy is specified in Preferences.


	clarg('enable-media-suspend') // Suspend media pipeline on background tabs.
	clarg('enable-inband-text-tracks') // ⊗	Enables support for inband text tracks in media content. ↪

	clarg('aec-refined-adaptive-filter')
	//		FIXED?
	// 		* Enables a new tuning of the WebRTC Acoustic Echo Canceler (AEC). The new tuning aims at resolving two issues with the AEC:
	// 		* https://bugs.chromium.org/p/webrtc/issues/detail?id=5777
	// 		* https://bugs.chromium.org/p/webrtc/issues/detail?id=5778
	// 		* TODO(hlundin): Remove this switch when experimentation is over; crbug.com/603821. ↪

	clarg('enable-usermedia-screen-capturing')
	// 		⊗ Enable screen capturing support for MediaStream API. ↪
	// --auto-select-desktop-capture-source ⊗	This flag makes Chrome auto-select the provided choice when an extension asks permission to start desktop capture. Should only be used for tests. For instance, --auto-select-desktop-capture-source="Entire screen" will automatically select to share the entire screen in English locales. ↪
	// blink('MediaDocumentDownloadButton')

	// ChromeOS --enable-cast-receiver ⊗	Enables the Cast Receiver. ↪ for ChromeOS..

	if (IS_WINDOWS) clarg('enable-win7-webrtc-hw-h264-decoding')//[1]
	//  Enables H264 HW decode acceleration for WebRtc on Win 7. ↪

	// --enable-vtune-support ⊗	Enable the Vtune profiler support. ↪
	// ANDROID --enable-internal-media-session[19] ⊗ Turns on the internal media session backend. This should be used by embedders that want to control the media playback with the media session interfaces. ↪

	// --max-gum-fps[13]
	// Override the maximum framerate as can be specified in calls to getUserMedia. This flag expects a value. Example: --max-gum-fps=17.5 ↪

	// "webrtc-event-logging";
	// Enable capture and local storage of WebRTC event logs without visiting
	// chrome://webrtc-internals. This is useful for automated testing. It accepts
	// the path to which the local logs would be stored. Disabling is not possible
	// without restarting the browser and relaunching without this flag.


	// --unsafely-allow-protected-media-identifier-for-domain ⊗	For automated testing of protected content, this switch allows specific domains (e.g. example.com) to skip asking the user for permission to share the protected media identifier. In this context, domain does not include the port number. User's content settings will not be affected by enabling this switch. Reference: http://crbug.com/718608 Example: --unsafely-allow-protected-media-identifier-for-domain=a.com,b.ca ↪
	// --allow-hidden-media-playback ⊗ Allows media playback for hidden WebContents ↪




	clarg('enable-drm-atomic')

	/* Audio ================================================================================ */

	clarg('enable-opus-playback')

	clarg('audio-output-channels',2)
	// Number of audio output channels. This will be used to send audio buffer with specific number of channels to ALSA and generate loopback audio. Default value is 2. ↪


	if (IS_WINDOWS) {
		clarg('enable-exclusive-audio')
		// 		⊗ Use exclusive mode audio streaming for Windows Vista and higher. Leads to lower latencies for audio streams which uses the AudioParameters::AUDIO_PCM_LOW_LATENCY audio path. See http://msdn.microsoft.com/en-us/library/windows/desktop/dd370844.aspx for details. ↪
		clarg('enable-exclusive-audio')
		// Use exclusive mode audio streaming for Windows Vista and higher. Leads to lower latencies for audio streams which uses the AudioParameters::AUDIO_PCM_LOW_LATENCY audio path. See http://msdn.microsoft.com/en-us/library/windows/desktop/dd370844.aspx for details. ↪
	}

	// New audio rendering mixing strategy
	// Use the new audio rendering mixing strategy. – Mac, Windows, Linux, Android
	clarg('new-audio-rendering-mixing-strategy')

	// DEPRECATED loopback-i2s ... flags
	// https://chromium-review.googlesource.com/c/chromium/src/+/728718 (64)

	clarg('alsa-enable-upsampling')
	//		* Flag that enables resampling audio with sample rate below 32kHz up to 48kHz. Should be set to true for internal audio products. ↪
	// blink('AudioOutputDevices')

	// --mse-audio-buffer-size-limit ⊗ Allows explicitly specifying MSE audio/video buffer sizes. Default values are 150M for video and 12M for audio. ↪

	// --voice-interaction-supported-locales ⊗ List of locales supported by voice interaction. ↪

	// --disable-voice-input ⊗

	// --enable-voice-interaction ⊗	Enables the VoiceInteraction support. ↪

	// --agc-startup-min-volume ⊗ Override the default minimum starting volume of the Automatic Gain Control algorithm in WebRTC used with audio tracks from getUserMedia. The valid range is 12-255. Values outside that range will be clamped to the lowest or highest valid value inside WebRTC. TODO(tommi): Remove this switch when crbug.com/555577 is fixed. ↪

	// --enable-audio-focus[16] ⊗ Enable a internal audio focus management between tabs in such a way that two tabs can't play on top of each other. The allowed values are: "" (empty) or |kEnableAudioFocusDuckFlash|. ↪


	/* Video ================================================================================ */

	enable('enable-accelerated-video')

	// clarg('force-overlay-fullscreen-video')
	// 		Forces use of hardware overlay for fullscreen video playback. Useful for
	//		 testing the Android overlay fullscreen functionality on other platforms.
	//		const char kForceOverlayFullscreenVideo[]   = "force-overlay-fullscreen-video";


	// PictureInPictureAPI

	// clarg('enable-picture-in-picture') //⊗ Enables the picture in picture feature for videos. ↪
	// NOTE: no effect?

	// --video-threads ⊗ Set number of threads to use for video decoding. ↪
	// CHROMEOS clarg('enable-video-player-chromecast-support')
	// --mse-video-buffer-size-limit ⊗ No description ↪
	// clarg('enable-gpu-memory-buffer-video-frames')
	// 		* Simulates shared textures when share groups are not available. Not available everywhere. ↪
	//		* Specifies which encryption storage backend to use. Possible values are
	//			* kwallet, kwallet5, gnome, gnome-keyring, gnome-libsecret, basic. Any other value will lead to Chrome detecting the best backend automatically. TODO(crbug.com/571003): Once PasswordStore no longer uses the Keyring or KWallet for storing passwords, rename this flag to stop referencing passwords.
	//			Do not rename it sooner, though; developers and testers might rely on it keeping large amounts of testing passwords out of their Keyrings or KWallets. ↪
	clarg('enable-video-player-chromecast-support')
	//		* Enables the chromecast support for video player app. ↪
	// if (IS_WINDOWS) clarg('force-mediafoundation')
	//		⊗	Force the use of MediaFoundation for video capture. This is only supported in Windows 7 and above. Used, like |kForceDirectShowVideoCapture|, to troubleshoot problems in Windows platforms. ↪
	// clarg('enable-sgi-video-sync') // Enable use of the SGI_video_sync extension, which can have driver/sandbox/window manager compatibility issues. ↪


	/* Net ================================================================================
	 		https://cs.chromium.org/chromium/src/components/network_session_configurator/common/network_switch_list.h?type=cs&sq=package:chromium&g=0&l=70
	*/
	clarg('enable-websocket-auth-connection-reuse')
	clarg('ignore-connection-limit', '127.0.0.1');
	clarg('use-simple-cache-backend', 'on')
	clarg('enable-simple-cache-backend')
		//This is a new caching backend for Chrome which aims to reduce the amount of time it takes to re-validate cached files in your browser. For Windows this can add up to about 14ms per request on average, and this new caching backend aims to remove this latency. By default "Simple Cache for HTTP" is disabled, however you can enable this by pasting the flag below into Chrome.
		// http://www.chromium.org/developers/design-documents/network-stack/disk-cache/very-simple-backend
		// http://www.chromium.org/developers/design-documents/network-stack/disk-cache/disk-cache-benchmarking

	// blink('FetchRequestCache')
	// The Simple Cache for HTTP is a new cache. It relies on the filesystem for disk space allocation. – Mac, Windows, Linux, Chrome OS

	// blink('BackgroundFetch') // ?

	blink('OffMainThreadFetch')
	// OffMainThreadWebSocket

	// !?
	// clarg('enable-resource-load-scheduler');s
	// 		Uses the resource load scheduler in blink to schedule and throttle resource load requests. – Mac, Windows, Linux, Chrome OS, Android

	clarg('enable-parallel-downloading');

	// clarg('proxy-server','localhost:1338')
	// clarg('num-pac-threads')
	// 		* Specifies the maximum number of threads to use for running the Proxy Autoconfig (PAC) script.
	// clarg('unsafe-pac-url')
	//		⊗	Pass the full https:// URL to PAC (Proxy Auto Config) scripts.
	//		* As opposed to the default behavior which strips path and query components before passing to the PAC scripts.
	clarg('adaboost')
	clarg('enable-async-dns')
	// 		* Enables the experimental asynchronous DNS client.


	clarg('enable-spdy4')
	// 		SPDY is still in the experimental / beta phase, but probably still usable for the most part. If you want to test out HTTP 2.0, or at least get an idea of the future you can enter in the url below into chrome and enable SPDY/4. If you are running the latest Windows 10 Tech Preview, Build 9926, you can enable this for Chrome. I believe you can also enable SPDY support for Windows 8.1. Right now, not a lot of websites fully support SPDY, but I would imagine that as time goes on, more and more sites will take advantage of SPDY, which is a protocol that your browser uses to talk to servers that host websites. SPDY lets your browser request and download more data at the same time, which makes everything faster.
	//		https://lmgtfy.com/?q=SPDY

	// clarg('enable-spdy-proxy-auth') // https://www.chromium.org/spdy/spdy-authentication
	// clarg('trusted-spdy-proxy // Disables same-origin check on HTTP resources pushed via a SPDY proxy. The value is the host:port of the trusted proxy.
	// clarg('max-spdy-sessions-per-domain // Sets the maximum SPDY sessions per domain.
	// clarg('max-spdy-concurrent-streams // Sets the maximum concurrent streams over a SPDY session.\// --spdy-proxy-auth-origin // Origin for which SpdyProxy authentication is supported.
	// clarg('enable-spdy3 // Enable SPDY/3. This is a temporary testing flag.
	// clarg('enable-spdy-credential-frames // Enable SPDY CREDENTIAL frame support. This is a temporary testing flag.
	// clarg('enable-websocket-over-spdy // Uses WebSocket over SPDY.

	clarg('enable-fast-tcp-open');
	clarg('enable-tcp-fast-open')
	clarg('enable-tcp-fastopen');
	//		you can enable this experimental setting which can help to reduce latency when interacting with websites. This assumes the webserver can take advantage of this, if not then you will not see performance gains, but still, if you want to test out all the new and shiny chrome features, give TCP fast open a shot! Enabling TCP Fast Open (TFO) for Chrome allows your browser to send additional data during the initial SYN connection (first part of TCP handshake), by sending data during this stage, you are able to eliminate 1 round trip between your browser and the website you are viewing. This will shave off a few milliseconds of latency, possibly much more depending on your location.
	//		https://bradleyf.id.au/nix/shaving-your-rtt-wth-tfo/
	//		https://en.wikipedia.org/wiki/TCP_Fast_Open
	//		good talk from apple https://www.nanog.org/sites/default/files/Paasch_Network_Support.pdf

	clarg('enable-fast-unload');

	clarg('enable-quic');
	// 		* This enables the QUIC (Quick UDP Internet Connection) protocol support. It's an experimental feature created to implement the security protection similar to TLS/SSL by a decreasing the number of connection & transport latency.
	//		* QUIC is essentially combining the best parts of SPDY and HTTP2 (the multiplexing) on top of a non-blocking transportation protocol.
	// 		* https://ma.ttias.be/googles-quic-protocol-moving-web-tcp-udp/

	// --disable-web-security // Don't enforce the same-origin policy. (Used by people testing their sites.)
	// --allow-cross-origin-auth-prompt // Allows third-party content included on a page to prompt for a HTTP basic auth username/password pair.
	// --allow-file-access // On ChromeOS, file:access is disabled except for certain whitelisted directories. This switch re-enables file:for testing.
	// --allow-running-insecure-content // By default, an https page cannot run JavaScript, CSS or plug-ins from http URLs. This provides an override to get the old insecure behavior.
	// --auth-server-whitelist // Whitelist of servers which NTLM and Negotiate can automatically authenticate with using the default credentials of the currently logged in user.

	// clarg('host-resolver-rules
	// clarg('hsts-hosts // Takes the JSON-formatted HSTS specification and loads it as if it were a preloaded HSTS entry. Takes precedence over both website-specified rules and built-in rules. The JSON format is the same as that persisted in <profile_dir>/Default/TransportSecurity

	// REMOVED
	// xxxxxxx clarg('host-rules Comma-separated list of rules that control how hostnames are mapped.
	//		* For example:
	//			* MAP * 127.0.0.1 → Forces all hostnames to be mapped to 127.0.0.1
	//			* MAP *.google.com proxy → Forces all google.com subdomains to be resolved to proxy.
	//			* MAP test.com [::1]:77 → Forces test.com to resolve to IPv6 loopback. Will also force the port of the resulting socket address to be 77.
	//			* MAP * baz, EXCLUDE www.google.com → Remaps everything to baz, except for www.google.com.
	//			* These mappings apply to the endpoint host in a net::URLRequest (the TCP connect and host resolver in a direct connection, and the CONNECT in an http proxy connection, and the endpoint host in a SOCKS proxy connection).

	clarg('host-resolver-parallelism', 12) // The maximum number of concurrent host resolve requests (i.e.  pr) to allow (not counting backup attempts which would also consume threads).
	// 		* --host-resolver-retry-attempts // must be set to zero for this to be exact.
	// --host-resolver-retry-attempts // The maximum number of retry attempts to resolve the host. Set this to zero to disable host resolver retry attempts.
	// --socket-reuse-policy // Socket reuse policy. The value should be of type enum ClientSocketReusePolicy.
	clarg('enable-ip-pooling') // Enables IP Pooling within the networks stack (SPDY only). When a connection is needed for a domain which shares an IP with an existing connection, attempt to use the existing connection.
	// --disable-ip-pooling // Disables IP Pooling within the networks stack (SPDY only). When a connection is needed for a domain which shares an IP with an existing connection, attempt to use the existing connection.

	// ? for webrtc ip leak maybe...
	// clarg('disable-ipv6') // Disables improved SafeBrowsing download protection.

	// clarg('privet-ipv6-only')z
	// --enable-auth-negotiate-port	// Enables the inclusion of non-standard ports when generating the Kerberos SPN in response to a Negotiate challenge. See HttpAuthHandlerNegotiate::CreateSPN for more background.
	// --ignore-urlfetcher-cert-requests //	Causes net::URLFetchers to ignore requests for SSL client certificates, causing them to attempt an unauthenticated SSL/TLS session. This is intended for use when testing various service URLs (eg: kPromoServerURL, kSbURLPrefix, kSyncServiceURL, etc). ↪
	clarg('allow-insecure-localhost');
	//		*  Enables TLS/SSL errors on localhost to be ignored (no interstitial, no blocking of requests). ↪
	clarg('ignore-certificate-errors');

	e.app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {

		// if (/https:\/\/localhost/g.test(url)) {
			event.preventDefault();
			callback(true);
		// } else {
		// 	callback(false);
		// }
	});




	/* GPU ================================================================================
			https://github.com/ds-hwang/wiki/wiki/Chromium-docs
			https://chromium.googlesource.com/chromium/src/+/lkgr/ui/gl/gl_switches.cc
			*/

	// clarg('gpu-sandbox-failures-fatal','yes')

	// clarg('gl')
	// clarg('gles')// ??






	// clarg('disable-gpu-watchdog') // ⊗ Disable the thread that crashes the GPU process if it stops responding to messages. ↪

	// clarg('enforce-gl-minimums')

	clarg('disable-gpu-process-crash-limit') // ⊗ Disable the limit on the number of times the GPU process may be restarted. For tests and platforms where software fallback is disabled. ↪
	// blink('DisableHardwareNoiseSuppression')

	// blink('Pepper3DImageChromium')

	clarg('supports-dual-gpus','true')
	// --supports-dual-gpus ⊗	Indicates whether the dual GPU switching is supported or not. ↪

	// clarg('gpu-process')// ⊗ Makes this process a GPU sub-process. ↪
	// clarg('instant-process')// ⊗	Marks a renderer as an Instant process. ↪

	//		⊗ Enables WebGL extensions not yet approved by the community. ↪
	process.env.ENABLE_VULKAN = true;
	clarg('enable-vulkan');
						// clarg('vulkan')
	// 		* Enable Vulkan support, must also have ENABLE_VULKAN defined. ↪
	// clarg('use-angle', 'gl');
	clarg('use-angle', 'vulkan')
	// 		* NOTE:  gl === BIG WINS!!!! gles seems good as well
	//		Options:
	//			* default: Attempts several ANGLE renderers until one successfully initializes, varying ES support by platform.
	//			* d3d9: Legacy D3D9 renderer, ES2 only.
	//			* d3d11: D3D11 renderer, ES2 and ES3.
	//			* warp: D3D11 renderer using software rasterization, ES2 and ES3.
	//			* gl: Desktop GL renderer, ES2 and ES3.
	//			* gles: GLES renderer, ES2 and ES3. ↪

	// clarg('use-gl', 'vulkan')
	//		NOTE vulkan || egl changes backdrop-filter rendering
	//		Select which implementation of GL the GPU process should use.
	//				- desktop: whatever desktop OpenGL the user has installed (Linux and Mac default).
	//				- egl: whatever EGL / GLES2 the user has installed (Windows default - actually ANGLE).
	//				- osmesa: The OSMesa software renderer.
	//				- swiftshader: The SwiftShader software renderer. ↪

	// clarg('in-process-gpu') // ? REQUIRED fir Vulkan?? ::
		// 	?	* Run the GPU process as a thread in the browser process. ↪



	if (GPU_SANDBOX) {
		clarg('gpu-sandbox-start-early')

	}
	else {
		clarg('disable-gpu-sandbox') // ? REQUIRED for Vulkan?? ::
		// ⊗ Disable the GPU process sandbox. ↪
	}
	clarg('gpu-sandbox-allow-sysv-shm')

	/*



	--gpu-launcher ⊗	Extra command line options for launching the GPU process (normally used for debugging). Use like renderer-cmd-prefix. ↪
	--force-gpu-mem-available-mb ⊗	Sets the total amount of memory that may be allocated for GPU resources ↪

	// !!
	*/
	// clarg('gpu-no-context-lost') // ⊗ Inform Chrome that a GPU context will not be lost in power saving mode, screen saving mode, etc. Note that this flag does not ensure that a GPU context will never be lost in any situations, say, a GPU reset. ↪


	// 		⊗ Allows shmat() system call in the GPU sandbox. ↪
	// --gpu-startup-dialog
	//		⊗ Causes the GPU process to display a dialog on launch. ↪


	//
	if (FRACTIONAL_SCALE_FACTOR) clarg('enable-pixel-canvas-recording')
	// 		https://docs.google.com/document/d/1eJArJkOhm-FTKKX6j7-zFV9aXVN0ZwA3RXlWifJFpiE/edit#heading=h.fmaw172dbpia
	//		⊗ If enabled, all draw commands recorded on canvas are done in pixel aligned measurements.
	//		* This also enables scaling of all elements in views and layers to be done via corner points. See https://goo.gl/Dqig5s ↪
	//		Pixel canvas recording allows the compositor to raster contents aligned with the pixel and improves text rendering. This should be enabled when a device is using fractional scale factor. – Mac, Windows, Linux, Chrome OS




	e.app.disableDomainBlockingFor3DAPIs() //By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behaviour.
	clarg('disable-gpu-driver-bug-workarounds')
	clarg('ignore-gpu-blacklist');
	// 		* Chrome by default black lists certain GPUs because of bugs.
	// 		* if your are not able to view webgl try enabling --ignore-gpu-blacklist option
	// 		* But, this will make electron/chromium less stable.
	if (!IS_WINDOWS)  clarg('enable-native-gpu-memory-buffers')
	// 		* Enable native GPU memory buffer support when available. ↪
	// 		* errata. you must want --enable-native-gpu-memory-buffers but it's not supported in Windows, as John mentioned.
	// --cast-initial-screen-width && --cast-initial-screen-height
	//		⊗ Used to pass initial screen resolution to GPU process. This allows us to set screen size correctly (so no need to resize when first window is created). ↪

	// --renderer ⊗	Causes the process to run as renderer instead of as browser. ↪
	// --renderer-client-id ⊗	No description ↪
	// --renderer-cmd-prefix ⊗	The contents of this flag are prepended to the renderer command line. Useful values might be "valgrind" or "xterm -e gdb --args". ↪

	// NACL IS DEPRECATED in BLINK
	// clarg('enable-nacl') // ⊗	Runs the Native Client inside the renderer process and enables GPU plugin (internally adds lEnableGpuPlugin to the command line). ↪
	// clarg('enable-nacl-nonsfi-mode') // ⊗	Enables Non-SFI mode, in which programs can be run without NaCl's SFI sandbox. ↪
	// --enable-nacl-debug ⊗	Enables debugging via RSP over a socket. ↪

	// enable-webgl2-compute-context
	// WebGL2ComputeContext

	// clarg('enable-webgpu') //???s
	// clarg('enable-unsafe-webgpu')
	// Enables unsafe WebGPU support.
	// const char kEnableUnsafeWebGPU[] = "enable-unsafe-webgpu";




	/* GPU / Renderers ------------------------------------------------------------------------------ */

	// if (SINGLE_RENDERER)
	!RENDERER_PRIORITY && clarg('disable-renderer-priority-management') // ⊗	No not manage renderer process priority at all when set. ↪

	// clarg('renderer-process-limit',
	// 	// CPU_COUNT - (CPU_COUNT >> 2)
	// 	CPU_COUNT - 2
	// 	// (CPU_COUNT >> 1) + 1
	// ) //v⊗	Overrides the default/calculated limit to the number of renderer processes. Very high values for this setting can lead to high memory/resource usage or instability. ↪

	// clarg('disable-renderer-backgrounding') // ⊗ Prevent renderer process backgrounding when set. ↪
	// clarg('disable-renderer-accessibility') // ⊗	Turns off the accessibility in the renderer. ↪
	// --renderer-cmd-prefix ⊗	The contents of this flag are prepended to the renderer command line. Useful values might be "valgrind" or "xterm -e gdb --args". ↪



	clarg('enable-es3-apis')
	// clarg('RenderingPipelineThrottling')// RenderingPipelineThrottlingLoadingIframes
	// blink('LowLatencyCanvas')
	// blink('Accelerated2dCanvas')
	// blink('ForceDisplayList2dCanvas')
	clarg('enable-accelerated-2d-canvas')


	clarg('enable-display-list-2d-canvas', 'Enable') //'Force')
	// 		* Enables display list based 2d canvas implementation.
	// 		* Options:
	//			1. Enable: allow browser to use display list for 2d canvas (browser makes decision).
	//			2. Force: browser always uses display list for 2d canvas. ↪
	clarg('enable-experimental-canvas-features')

	// ??
	clarg('enable-experimental-input-view-features')

	// WebGLDraftExtensions
	clarg('enable-webgl-draft-extensions')


	// clarg('limit-fps', 60)
	//			⊗ Limits the compositor to output a certain number of frames per second, maximum. ↪

	if (EXTERNAL_VIDEO_PLAYER_ONLY) {
		clarg('disable-gpu-vsync','beginframe')
		// clarg('disable-frame-rate-limit')
	}
	// Stop the GPU from synchronizing on the vsync before presenting.
	//		Options:
	// 			* beginframe: Next frame can start without any delay on cc::scheduler in renderer compositors.
	//			* gpu: Disable display and browser vsync.
	//			* default: Set both flags. ↪



	// ?
	// clarg('enable-gpu-async-worker-context')
	// 		* Makes the GL worker context run asynchronously by using a separate stream. ↪

	// ?
	// clarg('ui-prioritize-in-gpu-process')
	// 		* Prioritizes the UI's command stream in the GPU process ↪

	// clarg('disable-slimming-paint')
	// blink('SlimmingPaintV2') // disable('SlimmingPaintV2')
	// if (CHROMIUM_V > 66) {
		// clarg('enable-slimming-paint-v2')
	// 	// clarg('enable-slimming-paint-v175')
	// }
	// else {
	// 	clarg('enable-slimming-paint-v175')
	// }
	// clarg('enable-slimming-paint-v175')
	//
	// clarg('enable-slimming-paint')
	// 		* Enables slimming paint phase 2: http://www.chromium.org/blink/slimming-paint ↪
	// clarg('enable-slimming-paint-invalidation')
	//		* Enables paint invalidation based on slimming paint but without the full slimming paint v2 compositing code.
	//		* See: https://goo.gl/eQczQW

	// enable('UseSkiaDeferredDisplayList')
	// enable('UseSkiaRenderer')
	if (CHROMIUM_V > 66) {
		// Use SkiaRenderer with SkDeferredDisplayList instead to support Vulkan
	clarg('use-skia-deferred-display-list')
		clarg('use-skia-renderer','vulkan')
				// clarg('use-skia','vulkan')
	}
	//		* NOTE: Major perf boom, atleast with the right combo of flags
	//		* Always use the Skia GPU backend for drawing layer tiles.
	//		* Only valid with GPU accelerated compositing + impl-side painting.
	//		* Overrides the kEnableGpuRasterization flag. ↪
	//		* https://skia.org/
	//		* https://www.chromium.org/developers/design-documents/graphics-and-skia
	// --enable-skia-benchmarking ⊗	Enables the Skia benchmarking extension ↪


	/*

	https://cdn.rawgit.com/chromium/mus-preso/8ea9dcef/blinkon9/index.html#2

	https://cs.chromium.org/chromium/src/components/viz/common/switches.cc?g=0

	https://github.com/chromium/mus-preso

	Viz: Roadmap 2018
		Wat, 2017/12/07 https://cdn.rawgit.com/chromium/mus-preso/5505700c/roadmap18/index.html#1
		We have a relocated display compositor (OOP-D)
		We have OOP-R
		We Want This: OOP-D & OOP-R
			~15% reduced command buffer overhead
				paintops vs GL from renderer
				CompositorFrames vs GL from display compositor
			~15% from use of Vulkan (maybe more!)
		We have arranged to run --mus like this:
		Maybe a lost toy but combining --mus and --enable-viz
		Why Change Aura UI to RasterInterface
			UI raster thread uses GLES2Interface only to upload software-rasterized UI elements
			RasterInterface will eventually do this directly to Vulkan
			Instead of passing through GL to Vulkan texture transport
			In Salamander: switch UI to generating paint item lists
		Tadpole-Vulkan is about performance
		First: Vulkan GPU Bots
			Android GPU pixel bots with Vulkan drivers m65
			Windows GPU pixel bots with Vulkan drivers m65
			Linux and CrOS Vulkan bots after.
		First: Sluggish Tadpole: M65
			The bare minimum to combine OOP-R and OOP-D
		First: Remaining Tasks
			Surface Sync m65
			Skia Bulkupload m66?
		Next: Tasks
			... Aura UI with RasterInterface m67 ... Parallel Skia m68 & Complete SkiaRenderer m67
		Next: Virtual GL Contexts
		Next-Next: Parallel GL Pipe (Use parallel Skia m70)
		Next-Next: Parallel Vulkan Pipe (Replace GL with Vulkan m71)
		Next-Next: CrOS Parallel Vulkan Pipe
			Better CrOS Exo security with GLES execution in separate processes
		???
			? GLES or GL


	Chrome Graphics: Viz Update
		2018/04/18 https://cdn.rawgit.com/chromium/mus-preso/8ea9dcef/blinkon9/index.html#1
		Viz: What Is It
			The new name for the GPU process
			For the site-isolated web
			For over 20% better performance
		Viz API Surface
			Composting: OOP-D
				no longer needs CommandBuffer
				For Vulkan compositing
			Rasterization: OOP-R
			WebGL: GLES2Interface
		Site Isolation
			Historically: one client / web contents
			But exploits like SPECTRE make cross-origin iframes scary
			Require synchronized draw of CompositorFrame from many renderers.
			And events routed back to each renderer
			Mitigate asynchrony:
				Surface Synchronization & New Event Targeting
		Surface Synchronization
			UI can asynchronusly request atomic update of itself and web platform children
			On in  m67 on desktop. Targeting m68 for Android
			Required for OOP-D. But also reduces UI variance!
		New Event Targeting
			Viz version 1 in Finch trial (--enable-viz-hit-test-draw-quad) in m64 m67
		Enhanced Draw Occlusion
			OOP-D can increase overdraw on CrOS and for site isolated frames
			Mitigate with enhanced draw conclusion
			educes power consumption and improves frame times
			In trial now --enable-draw-occlusion
		OOP-R From Renderer
			Renderer with GPU Process
			Rasterization in Viz
			Enable --enable-gpu-rasterization --enable-oop-rasterization
		OOP-D: No CommandBuffer
			Use SkiaRenderer with SkDeferredDisplayList instead to support Vulkan
			Prototyping now with first Vulkan pixels. Trial in m69
		OOP-R: No CommandBuffer
			First OOP-R implementation ships paint opts over a CommandBuffer
			Future OOP-R uses SkDeferredDisplayList instead for parallelism and Vulkan







	Viz: Chrome Graphics Futures ------------------------------------------------------------------------------
			2017/09/21	https://cdn.rawgit.com/chromium/mus-preso/9433b180/blinkon8/index.html#1
		Viz: Two contexualizations
			1) Servicification (“the migration from monolithic legacy applications into service-based components”)
				The Mojo UI service is a core service in Chrome
				Viz (for Visuals) is a sub-service responsible for producing visual output:
					compositing, rasterization, GPU virtualization.
			2) Augmenting the GPU Process
				In existing Chrome, the GPU process is responsible for virtualizing a hardware GPU.
				But we are adding additional functionality for compositing and rasterization.
				So a new name
		GPU process vs Viz
			Viz is more than just a servicification tickbox, better for the Web platform:
				- Better compositing performance
				- Better rasterization performance
				- Toll-free rasterization and compositing for site isolation
			Coming to Chrome over the next 2-3 milestones
			A prepatory refactoring for direct compositing: removing the bolded CommandBuffer
			Promises to deliver a 10-15% performance improvement
		Viz: Tadpole with Direct Skia Compositing
			Tadpole __DisplayCompositor__ uses __GLRenderer__
			Replace with __SkiaRenderer__ for direct compositing
			Enable the WIP version --use-skia-renderer
		UI Graphics Pipeline Changes
			before: Synchronous function call
			after: Asynchronous IPC... __Display Compositor__
		Status
			Surface References to improve tracking of objects on in 63
			Improved CompositorFrame eviction on in 64
			__Surface Synchronization__ so UI can atomically update sizes of web platform children on in 64
			Cross-process Tab readback on in 64
			Revised event targeting on in 64
			Improved occlusion culling on in 64
			SkiaRenderer performant in 67
	*/

	// if (!IS_PACKAGED) {
	// 	clarg('enable-viz-devtools')
	// }

	// requires ENABLE_PACKAGE_MASH_SERVICES
	clarg('mus')// currently doesn't require a relocated compositor

	if (CHROMIUM_V > 66)
		clarg('viz')  //(e.g. the relocated compositor) doesn't need mus
	// But... can't enable this because the GPU service is in mus

	// "Finch trial"

	// ???
	if (CHROMIUM_V > 66){
		clarg('gl-composited-overlay-candidate-quad-border')
		clarg('enable-viz-hit-test-draw-quad') // m67
		// enable('VizHitTestDrawQuad')
		// enable('VizHitTestSurfaceLayer')
		// clarg('use-viz-hit-test-surface-layer')
		// clarg('use-viz-hit-test') //WindowServer uses the viz hit-test logic (HitTestAggregator and HitTestQuery). ↪
		// enable('VizDisplayCompositor') // BROKE? enable('VizDisplayCompositor')
	}

	clarg('enable-draw-occlusion')
	// Enable the system to use draw occlusion to skip draw quads when they are not shown on the screen. – Mac, Windows, Linux, Chrome OS, Android
		// enable('DrawOcclusion') //  FEATURE_ENABLED_BY_DEFAULT

	clarg('enable-viz')
	clarg('enable-viz-display-compositor')

	// Enables inspecting Viz Display Compositor objects. Default port is 9229.
	// For local inspection use chrome://inspect#other
	// const char kEnableVizDevTools[] = "enable-viz-devtools";
	if (IS_DEV) {
		clarg('enable-viz-devtools')
	}

	clarg('enable-oop-rasterization')
	//const char kEnableOopRasterization[] = "enable-oop-rasterization";
	// Turns on out of process raster for the renderer whenever gpu raster
	// would have been used.  Enables the chromium_raster_transport extension.

	if (CHROMIUM_V > 66){
		clarg('force-gpu-rasterization')
		// clarg('enable-gpu-rasterization')
	} else { // ?!!!!  all text disappears
		clarg('enable-gpu-rasterization')
	}

	// Always use the Skia GPU backend for drawing layer tiles. Only valid with GPU
	// accelerated compositing + impl-side painting. Overrides the
	// kEnableGpuRasterization flag.


	// TODO: ELECTRON BROKE IT? ERR ==> https://github.com/electron/electron/pull/13784/files
	// TODO: check Windows / Linux
	clarg('enable-surface-synchronization')
	enable('SurfaceSynchronization')
	//		https://cdn.rawgit.com/chromium/mus-preso/8ea9dcef/blinkon9/index.html#8
	//		⊗ Enables multi-client Surface synchronization.
	//		* In practice, this indicates that LayerTreeHost expects to be given a valid viz::LocalSurfaceId provided by the parent compositor. ↪

	clarg('enable-async-event-targeting')

	//--enable-mojo-chawa
	//--MojoChannel
	// --wait-for-mojo-shell

	clarg('mojo-local-storage')
	// ⊗	Use a Mojo-based LocalStorage implementation. ↪

	// clarg('mojo-pipe-token') // ⊗	No description ↪

	clarg('navigation-mojo-response');
	// Navigation response using a Mojo DataPipe.

	// Site Isolation... seems broken
	SITE_ISOLATION && clarg('site-per-process')// ⊗	Enforces a one-site-per-process security policy:
	// 		* Each renderer process, for its whole lifetime, is dedicated to rendering pages for just one site.
	// 		* Thus, pages from different sites are never in the same process.
	// 		* A renderer process's access rights are restricted based on its site.
	// 		* All cross-site navigations force process swaps.
	// 		* <iframe>s are rendered out-of-process whenever the src= is cross-site. More details here: - http://www.chromium.org/developers/design-documents/site-isolation - http://www.chromium.org/developers/design-documents/process-models
	// 			- The class comment in site_instance.h, listing the supported process models.
	//		IMPORTANT: this isn't to be confused with --process-per-site (which is about process consolidation, not isolation).
	// 		You probably want this one, not --process-per-site ⊗

	/*
		Mus, Tadpole
			BlinkOn, 2017/02/01 https://cdn.rawgit.com/chromium/mus-preso/a5701889/blinkon/index.html
			Mojo, fancy IPC to glue the components together
				- Better Chrome IPC
				- Factors out process separation
			Mandoline: prototype src/content refactoring using Mojo
			Tadpole
				Centralizes DisplayCompositor
				Enables direct rendering: Vulkan
				Improves OOPIF support
			GPU Raster: Direct GL or Vulkan
			Salamander
				Centralized LayerCompositor
				Global raster occlusion
				Efficient OOPIF support
				Single graphics scheduling point
	*/

	/*
	Viz Display Compositor (OOP-D) ------------------------------------------------------------------------------
	 		If enabled, the display compositor runs as part of the viz service in theGPU process. – Mac, Windows, Linux
	 		https://docs.google.com/presentation/d/1PfaIDZ5oJTEuAEJR8aj-B9QC-r1Pht_jQXwjifM1jQI/edit#slide=id.g352d5f2d23_0_20
	 		Moving the display compositor from the browser UI thread to a dedicated compositor thread in the GPU process.
			Why OOP-D?
				Vulkan compositing without writing a Vulkan command buffer.
				Enable salamander architecture (No renderer impl thread(s), do impl thread work in GPU process.
				Less display compositor GL overhead (No IPC and maybe no command buffer.
				More responsive UI
					Display compositor not impacted by UI thread queuing delay.
					UI thread runs fewer tasks which lowers queuing delay.
				Fewer browser process crashes
			Browser Process Changes
				No more display compositor.
			Works (mostly) on Windows, Linux and Mac
			Rough edges:
					Software compositing for video, pepper, canvas, etc. is still being finished.
					DevTools renderer data and screen capture
			The VizDisplayCompositor feature turns OOP-D on. Can be enabled from command line or chrome:flags.
	*/


	/* GPU /Compositing ------------------------------------------------------------------------------ */

	clarg('enable-direct-composition-layers')// ⊗	Enables using DirectComposition layers, even if hardware overlays aren't supported. ↪
	// BROKEclarg('enable-layer-lists')// ⊗ Switches cc machinery to use layer lists instead of layer trees ↪
	// BROKE clarg('ui-enable-layer-lists')
	// clarg('ui-disable-partial-swap')


	// clarg('disable-gpu-compositing') //	Prevent the compositor from using its GPU implementation. ↪

	// clarg('disable-composited-antialiasing')	// Disables layer-edge anti-aliasing in the compositor. ↪
	if (IS_MAC) clarg('enable-gpu-memory-buffer-compositor-resources')
	// 		* Specify that all compositor resources should be backed by GPU memory buffers.
	// 		* it's hardware overlay related feature, which promotes normal layer to hardware overlay plane.
	//		* Only MacOSX
	// clarg('disable-gpu-memory-buffer-compositor-resources') // Do not force that all compositor resources be backed by GPU memory buffers. ↪
	// blink('CompositorWorker')

	// clarg('disable-threaded-compositing') // Disable multithreaded GPU compositing of web content. ↪
	clarg('enable-threaded-compositing')
	// 		* Threaded compositing will launch a secondary thread on multicore systems dedicated to webpage compositing.
	//		* Enabling this option may result in smoother scrolling, even if the main thread is busy with other processing duties.
	//		* NOTE: Seems to decrease frame-rate


	// ?!
	// IMPORTANT: this seems to cause issues with backdrop-filter / heavy GPU
	// clarg('enable-webgl-image-chromium')

	// 		* Enables WebGL rendering into a scanout buffer for overlay support. ↪
	// clarg('disable-webgl-image-chromium') // Disables WebGL rendering into a scanout buffer for overlay support. ↪
	// clarg('disable-mac-overlays') // Fall back to using CAOpenGLLayers display content, instead of the IOSurface based overlay display path. ↪
	// clarg('disable-mac-views-native-app-windows') //	Disables use of toolkit-views based native app windows. ↪
	clarg('enable-swap-buffers-with-bounds')
	// 		* nables SwapBuffersWithBounds if it is supported. ↪
	// clarg('blacklist-accelerated-compositing')
	// 		* NOTE: basically disables webgl

	if (!IS_WINDOWS)
		clarg('enable-hardware-overlays', 'single-fullscreen,single-on-top')//,single-on-top')//,underlay') "single-fullscreen,single-on-top,underlay"
	// 		https://cs.chromium.org/chromium/src/chrome/browser/about_flags.cc?type=cs&q=kEnableHardwareOverlays&sq=package:chromium&g=0&l=247
	// 		* Enable compositing individual elements via hardware overlays when permitted by device.
	// 		* Setting the flag to "single-fullscreen" will try to promote a single fullscreen overlay and use it as main framebuffer where possible. ↪
	// 		* doesn't work on windows.




	// clarg('ui-enable-zero-copy') //? // SLOWER ==>
	clarg('enable-zero-copy')
	// Enable rasterizer that writes directly to GPU memory associated with tiles. ↪
	// enabling gpu rasterization means that zero copy won't be used anyway

	//		* Conclusion: While it would be great to make use of the GPU to accelerate rendering of all web pages, it’s just not suitable for some tasks. The plan to solve this issue in Chromium is to use software (CPU) rendering with the zero copy optimization for pages where that method is faster, but to use GPU rendering otherwise. We can determine which method should be used by some heuristic. For example, we can use the CPU if the site has a lot of text (especially Chinese or Arabic), and use the GPU on pages with many animations and transition effects. For the cases where it makes sense to use it, GPU accelerated rendering allows for more seamless animations and better performance.
	//		* https://software.intel.com/en-us/articles/software-vs-gpu-rasterization-in-chromium

	// Allow heuristics to determine when a layer tile should be drawn with the Skia GPU backend. Only valid with GPU accelerated compositing + impl-side painting. ↪



	/* GPU / Rasterization ------------------------------------------------------------------------------ */



	// clarg('canvas-msaa-sample-count', 16)
	// 		* It defines the number of MSAA samples for better GPU rasterization.


	clarg('disable-partial-raster')
	//		https://bugs.chromium.org/p/chromium/issues/detail?id=537722
	//			- "I didn't intend for renderer partial raster to be on for GPU: kEnablePersistentGpuMemoryBuffer should prevent PERSISTENT_MAP buffers from being used.
	//		⊗ Disabling this switch also disables the use of persistent gpu memory buffers. ↪
	// clarg('enable-partial-raster')
	// 		⊗ Enable partial raster in the renderer. ↪

	clarg('gpu-rasterization-msaa-sample-count', 0)
	// 		* The number of multisample antialiasing samples for GPU rasterization. Requires MSAA support on GPU to have an effect. 0 disables MSAA. ↪

	// if (RASTER_THREADS > -1) clarg( 'num-raster-threads', RASTER_THREADS  );
	// NOTE: better to let chrome do this


	/* GPU / Textures ------------------------------------------------------------------------------ */

	// clarg('ui-enable-rgba-4444-textures')

	// clarg('emulate-shader-precision')

	// clarg('use-cmd-decoder')
	clarg('use-passthrough-cmd-decoder')
	// 		⊗ Use the Pass-through command decoder, skipping all validation and state tracking. ↪

	// Sets the width and height above which a composited layer will get tiled.
	//const char kMaxUntiledLayerHeight[]         = "max-untiled-layer-height";
	// const char kMaxUntiledLayerWidth[]          = "max-untiled-layer-width";

	clarg('max-untiled-layer-height',1024); clarg('max-untiled-layer-width',1024);
	clarg('default-tile-width',512); clarg('default-tile-height',512); // Allows using maximum tiles for interest area per user-defined width. If you have more RAM (4GB+) then allowing chrome to use more RAM will speed up browsing & decrease frame rate while page loading.
	// clarg('default-tile-width',1024); clarg('default-tile-height',1024); // Allows using maximum tiles for interest area per user-defined width. If you have more RAM (4GB+) then allowing chrome to use more RAM will speed up browsing & decrease frame rate while page loading.

	clarg('enable-tile-compression')

	clarg('max-tiles-for-interest-area', 512)
	//		To increase the amount of memory that Chrome can use paste this into the URL bar in Chrome. Click on the drop down menu under the setting that's called "Maximum tiles for interest area", which is just a fancy name for "use moar ram". Whether or not this really "speeds" up Chrome is another story, but if you're like me and have 16GB of RAM to burn, why not increase the limits a bit? By raising the limit for max-tiles-for-interest-area, you are letting Chrome use more Memory to store data, usually cached files from websites you frequently visit. This means that there are better odds of reusing cached files, so your internet appears faster because your browser does not need to request data, like pictures if they are already stored in your browser.
	//		The values are in MB: Default, 64, 128, 256, 512


	// When using CPU rasterizing generate low resolution tiling. Low res
	// tiles may be displayed during fast scrolls especially on slower devices.
	// const char kEnableLowResTiling[] =
	if (CHROMIUM_V <= 66) // ??
		clarg("enable-low-res-tiling");

	// if (!IS_WINDOWS) clarg('enable-threaded-texture-mailboxes')
	// 		* IMPORTANT: WARNING BREAKS WINDOWS, & USE WITH share-group!
	// 		- seems to fix issues when mac is acting strange (not needed after reboot)

	clarg('enable-share-group-async-texture-upload')

	// override-use-software-gl-for-tests ⊗ //Forces the use of software GL instead of hardware gpu. ↪




	/* Image ================================================================================ */

	clarg('enable-async-image-decoding');
	// blink('CanvasImageSmoothing')
	// PreloadImageSrcSet


	clarg('enable-checker-imaging')
	//		6/15/17 https://groups.google.com/a/chromium.org/forum/#!msg/graphics-dev/RQanMIHsH8w/ih4_sch1CAAJ
	//		As of Chrome version: 61.0.3117, checker-imaging is enabled as a finch trial on the canary channel. With the feature enabled, the renderer compositor will no longer block a frame on a lengthy image decode and will instead draw without the image while the decode is performed asynchronously on a worker thread.

	/* Color ================================================================================ */

	// ColorCanvasExtensions
	// blink('CSSHexAlphaColor')
	// blink('CanvasColorManagement')
	// blink('ColorCorrectRendering')
	// REMOVED clarg("enable-hdr")
	// force-color-profile ⊗ // Force all monitors to be treated as though they have the specified color profile. Accepted values are "srgb" and "generic-rgb" (currently used by Mac layout tests) and "color-spin-gamma24" (used by layout tests). ↪


	/* Text / Font Rendering ================================================================================ */


	clarg('enable-font-cache-scaling');

	clarg('font-cache-shared-handle')
	// DirectWrite FontCache is shared by browser to renderers using shared memory.
	// This switch allows us to pass the shared memory handle to the renderer.
	// const char kFontCacheSharedHandle[] = "font-cache-shared-handle";

	if (TEXT_SDF) clarg('enable-distance-field-text')
	// https://www.lifehacker.com.au/2014/11/chromes-signed-distance-field-font-rendering-still-needs-work/


	if (IS_MAC && CHROMIUM_V > 66 && TEXT_HARFBUZZ) clarg('enable-harfbuzz-rendertext')
	// WARN: SLIGHT DECREASE IN FPS??
	//[7] ⊗	Enables the HarfBuzz port of RenderText on Mac (it's already used only for text editing; this enables it for everything else). ↪
	// Enable cross-platform HarfBuzz layout engine for UI text. Doesn't affect web content. – Mac

	if (TEXT_LCD) {
		clarg('enable-lcd-text')
		clarg('enable-prefer-compositing-to-lcd-text') // ⊗	Enable the creation of compositing layers when it would prevent LCD text. ↪
		if (PIXEL_RATIO > 1) clarg('disable-lcd-text-aa')
		// clarg('enable-lcd-text-aa')
	}

	clarg('disable-font-antialiasing') // ⊗	Enables LCD text. ↪

	clarg('ppapi-antialiased-text-enabled',0)
	// The boolean value (0/1) of FontRenderParams::antialiasing to be passed to
	// Ppapi processes

	if (PIXEL_RATIO > 1) clarg('ppapi-subpixel-rendering-setting',0)
	// The enum value of FontRenderParams::subpixel_rendering to be passed to Ppapi
	// processes.

	// clarg('enable-webfonts-intervention-v2')// ⊗	WebFonts intervention v2 flag and values. ↪

	// clarg('enable-emoji-context-menu')
	// Emoji Context Menu
	// Enables the Emoji picker item in context menus for editable text areas. – Mac, Windows, Linux, Chrome OS


	// --unsafely-treat-insecure-origin-as-secure ⊗	Treat given (insecure) origins as secure origins. Multiple origins can be supplied. Has no effect unless --user-data-dir is also supplied. Example: --unsafely-treat-insecure-origin-as-secure=http://a.test,http://b.test --user-data-dir=/test/only/profile/dir ↪

	// --trusted-download-sources ⊗	Identifies a list of download sources as trusted, but only if proper group policy is set. ↪

	// --cipher-suite-blacklist ⊗	Comma-separated list of SSL cipher suites to disable. ↪
	// --class[9] ⊗	The same as the --class argument in X applications. Overrides the WM_CLASS window property with the given value. ↪
	// --wm-window-animations-disabled ⊗	If present animations are disabled. ↪
	// --yield-between-content-script-runs ⊗	Whether to split content script injections into multiple tasks. ↪
	// --zygote ⊗	Causes the process to run as a renderer zygote. ↪

	// --force-variation-ids ⊗	Forces additional Chrome Variation Ids that will be sent in X-Client-Data header, specified as a 64-bit encoded list of numeric experiment ids. Ids prefixed with the character "t" will be treated as Trigger Variation Ids. ↪
	// --fake-variations-channel ⊗	Fakes the channel of the browser for purposes of Variations filtering. This is to be used for testing only. Possible values are "stable", "beta", "dev" and "canary". Note that this only applies if the browser's reported channel is UNKNOWN. ↪
	// --reset-variation-state ⊗	Forces a reset of the one-time-randomized FieldTrials on this client, also known as the Chrome Variations state. ↪
	// --variations-override-country ⊗	Allows overriding the country used for evaluating variations. This is similar to the "Override Variations Country" entry on chrome://translate-internals, but is exposed as a command-line flag to allow testing First Run scenarios. Additionally, unlike chrome://translate-internals, the value isn't persisted across sessions. ↪
	// --variations-server-url ⊗	Specifies a custom URL for the server which reports variation data to the client. Specifying this switch enables the Variations service on unofficial builds. See variations_service.cc. ↪






	/*
	// --top-chrome-md ⊗	Enables top Chrome material design elements. ↪
	// --show-md-login ⊗	If true, the views-based md login and lock screens will be shown. ↪
	// --show-non-md-login ⊗	If true, the non-md login and lock screens will be shown. ↪
	// --secondary-ui-md ⊗	Applies the material design mode passed via --top-chrome-md to elements throughout Chrome (not just top Chrome). ↪
	--material ⊗	Material design mode for the |kTopChromeMD| switch. ↪
	--material-design-ink-drop-animation-speed ⊗	Defines the speed of Material Design visual feedback animations. ↪
	--material-hybrid ⊗	Material design hybrid mode for the |kTopChromeMD| switch. Targeted for mouse/touch hybrid devices.
	*/

	// -show-app-list ⊗	If true the app list will be shown. ↪

	/*
	-primary ⊗
	--secondary ⊗	No description ↪
	--secondary-display-layout ⊗	Specifies the layout mode and offsets for the secondary display for testing. The format is "<t|r|b|l>,<offset>" where t=TOP, r=RIGHT, b=BOTTOM and L=LEFT. For example, 'r,-100' means the secondary display is positioned on the right with -100 offset. (above than primary) ↪
	*/



	/*
		Autoplay policy to require a user gesture in ordor to play for cross origin iframes. ↪
	--utility ⊗	Causes the process to run as a utility subprocess. ↪
	--utility-allowed-dir ⊗	When utility process is sandboxed, there is still access to one directory. This flag specifies the directory that can be accessed. ↪
	--utility-cmd-prefix ⊗	The contents of this flag are prepended to the utility process command line. Useful values might be "valgrind" or "xterm -e gdb --args". ↪
	--utility-run-elevated ⊗	No description ↪
	--utility-sandbox-type ⊗	Type of sandbox to apply to the utility process. Options are "none", "network", or "utility" (the default). ↪
	--utility-startup-dialog ⊗	Causes the utility process to display a dialog on launch. ↪
	*/

	/*
	--translate-ranker-model-url ⊗	Overrides the URL from which the translate ranker model is downloaded. ↪
	--translate-script-url ⊗	Overrides the default server used for Google Translate. ↪
	--translate-security-origin ⊗	Overrides security-origin with which Translate runs in an isolated world. ↪

	*/

	/*
	--trace-config-file ⊗	Causes TRACE_EVENT flags to be recorded from startup. This flag will be ignored if --trace-startup or --trace-shutdown is provided. ↪
	--trace-export-events-to-etw[1] ⊗	Enables the exporting of the tracing events to ETW. This is only supported on Windows Vista and later. ↪
	--trace-shutdown ⊗	Causes TRACE_EVENT flags to be recorded beginning with shutdown. Optionally, can specify the specific trace categories to include (e.g. --trace-shutdown=base,net) otherwise, all events are recorded. --trace-shutdown-file can be used to control where the trace log gets stored to since there is otherwise no way to access the result. ↪
	--trace-shutdown-file ⊗	If supplied, sets the file which shutdown tracing will be stored into, if omitted the default will be used "chrometrace.log" in the current directory. Has no effect unless --trace-shutdown is also supplied. Example: --trace-shutdown --trace-shutdown-file=/tmp/trace_event.log ↪
	--trace-startup ⊗	Causes TRACE_EVENT flags to be recorded from startup. Optionally, can specify the specific trace categories to include (e.g. --trace-startup=base,net) otherwise, all events are recorded. Setting this flag results in the first call to BeginTracing() to receive all trace events since startup. In Chrome, you may find --trace-startup-file and --trace-startup-duration to control the auto-saving of the trace (not supported in the base-only TraceLog component). ↪
	--trace-startup-duration ⊗	Sets the time in seconds until startup tracing ends. If omitted a default of 5 seconds is used. Has no effect without --trace-startup, or if --startup-trace-file=none was supplied. ↪
	--trace-startup-file ⊗	If supplied, sets the file which startup tracing will be stored into, if omitted the default will be used "chrometrace.log" in the current directory. Has no effect unless --trace-startup is also supplied. Example: --trace-startup --trace-startup-file=/tmp/trace_event.log As a special case, can be set to 'none' - this disables automatically saving the result to a file and the first manually recorded trace will then receive all events since startup. ↪
	--trace-to-console ⊗	Sends a pretty-printed version of tracing info to the console. ↪
	--trace-to-file ⊗	Sends trace events from these categories to a file. --trace-to-file on its own sends to default categories. ↪
	--trace-to-file-name ⊗	Specifies the file name for --trace-to-file. If unspecified, it will go to a default file name. ↪
	--trace-upload-url ⊗	Sets the target URL for uploading tracing data. ↪
	*/


	/*
		Links
		https://github.com/electron/electron/blob/ec2799d4cd788d9e730c7f6808124c7f2f7e8697/atom/app/command_line_args.cc
		https://github.com/electron/electron/blob/master/docs/api/environment-variables.md#google_api_key
		https://console.cloud.google.com/apis/credentials?project=electron-api-key&folder&organizationId=735176413760
		https://www.chromium.org/developers/how-tos/api-keys
	*/
}