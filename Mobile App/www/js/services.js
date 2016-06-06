angular.module('starter.services', [])

.factory("$powerbar",function($http,$q){
	var powerbar = {
		total_plugs: 8,
		plugs: [],
		clickPlug: function(plug){
			var deferred = $q.defer();
			$http.get("https://agent.electricimp.com/#############?plug="+plug.toString()) /// you will need your own imp to test
				.success(function(res){
					deferred.resolve(res);
				}).error(function(e,r){
					deferred.reject(e);
			})
			return deferred.promise;
		},
		powerOff: function(){
			var deferred = $q.defer();
			$http.get("https://agent.electricimp.com/#############?all=1")   /// you will need your own imp to test
				.success(function(res){
					deferred.resolve(res);
				}).error(function(e,r){
					deferred.reject(e);
			})
			return deferred.promise;
		}
	};
	function truthy(inVar){
		var num = parseInt(inVar);
		console.log(num);
		if(num == 1){
			return false
		}
		if(num == 0){
			return true
		}
	}

	(function(){
		$http.get("https://agent.electricimp.com/#############?status=0") /// you will need your own imp to test
		.success(function(res){
			console.log(res)
			var array = res.split(",");
			for(i=0;i<array.length;i++){
				if(i == 7){   //// LAST PLUG IS ALWAYS ON
					var obj = {
						plug_number: i,
						state: true
					}
					powerbar.plugs.push(obj)
				}else{
					var obj = {
						plug_number: i,
						state: truthy(array[i])
					}
					powerbar.plugs.push(obj)
				}
			}
			console.log(powerbar);
			return powerbar.plugs;
		}).error(function(e,r){
			return (e);
		})
	})()

	return powerbar
})