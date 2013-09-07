/**
* AbstractData Class
*/
function AbstractData(){
	this.data = []
}

AbstractData.prototype._get = function(){
	return this.data
}

AbstractData.prototype._set = function(dataRows){
	for(i in dataRows){
		this.add(dataRows[i])
	}
}

AbstractData.prototype._add = function(row){
	this.data.push(row)
}

AbstractData.prototype._remove = function(index){
	if(this.data.length-1 >= index){
		this.data.splice(index, 1)
	}
	else{
		throw "The data's length is less than what was indexed"
	}
}

/**
 * Tab Data Class
 */
function TabData() {
    // Parent constructor
    AbstractData.call(this)
	
	this.requiredAttrs = ['x', 'y']
	this.cat = 'meow'
}

// Inheritance
TabData.prototype = Object.create(AbstractData.prototype); 

TabData.prototype.validInputObject = function(object){
	var isValid = true
	
	for(var attr in this.requiredAttrs){
		if(this.requiredAttrs[attr] in object === false){
			isValid = false
			break
		}
	}
	
	return isValid
}

TabData.prototype.get = function(){
	return this._get()
}

TabData.prototype.set = function(dataRows){
	for(i in dataRows){
		this.add(dataRows[i])
	}
}

TabData.prototype.add = function(row){
	if(this.validInputObject(row)){
		this._add(row)
	}
	else{
		console.log('The input was not a valid object')
	}
}

TabData.prototype.remove = function(index){
	this._remove(index)
}


