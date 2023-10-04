// LocalStorageService.js
const LocalStorageService = (function(){
    var _service;
    function _getService() {
        if(!_service) {
            _service = this;
            return _service
        }
        return _service
    }
    function _setToken(access_token, refresh_token) {
        localStorage.setItem('access_token', JSON.stringify(access_token));
        localStorage.setItem('refresh_token', JSON.stringify(refresh_token));
    }
    function _getAccessToken() {
        return JSON.parse(localStorage.getItem('access_token'));
    }
    function _getRefreshToken() {
        return JSON.parse(localStorage.getItem('refresh_token'));
    }
    function _clearToken() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }
    return {
        getService : _getService,
        setToken : _setToken,
        getAccessToken : _getAccessToken,
        getRefreshToken : _getRefreshToken,
        clearToken : _clearToken
    }
})();

export default LocalStorageService;