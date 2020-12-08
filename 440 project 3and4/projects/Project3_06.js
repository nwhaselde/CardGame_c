"use strict";

var canvas;
var gl;
var program;

//x y and z axes positions
var x = -10;
var y = 0;
var z = 0;
var x1 = 10;
var y1 = 0;
var z1 = 0;

//tail angles
var wag = 0;
var wag1 = 0;

//upper leg angles
var leftFrontLeg = 90;
var leftBackLeg = 90;
var rightFrontLeg = 90;
var rightBackLeg = 90;
var leftFrontLeg1 = 90;
var leftBackLeg1 = 90;
var rightFrontLeg1 = 90;
var rightBackLeg1 = 90;

var projectionMatrix;
var modelViewMatrix;
var instanceMatrix;
var modelViewMatrixLoc;
var NumVertices = 36;
var vertices = [
    vec4(-0.5, -0.5,  0.5, 1.0 ),
    vec4(-0.5,  0.5,  0.5, 1.0 ),
    vec4( 0.5,  0.5,  0.5, 1.0 ),
    vec4( 0.5, -0.5,  0.5, 1.0 ),
    vec4(-0.5, -0.5, -0.5, 1.0 ),
    vec4(-0.5,  0.5, -0.5, 1.0 ),
    vec4( 0.5,  0.5, -0.5, 1.0 ),
    vec4( 0.5, -0.5, -0.5, 1.0 )
];

// Initialize light and material variables
var lightPosition = vec4(1.0, 1.0, 1.0, 0.0 );
var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

var materialAmbient = vec4( 1.0, 0.0, 1.0, 1.0 );
var materialDiffuse = vec4( 1.0, 0.8, 0.0, 1.0);
var materialSpecular = vec4( 1.0, 0.8, 0.0, 1.0 );
var materialShininess = 100.0;

var ctm;
var ambientColor, diffuseColor, specularColor;
var modelView, projection;
var viewerPos;

//Dog 1 Vars
var torsoId = 0;
var headId  = 1;
var head1Id = 1;
var head2Id = 10;
var leftFrontUpperLegId = 2;//leftupperarm
var leftFrontLowerLegId = 3;//leftlowerarm
var rightFrontUpperLegId = 4;//rightupperarm
var rightFrontLowerLegId = 5;//rightLowerArm
var leftBackUpperLegId = 6;//leftupprerleg
var leftBackLowerLegId = 7;//leftlowerleg
var rightBackUpperLegId = 8;//rightupperleg
var rightBackLowerLegId = 9;//rightlowerleg
var tailId = 11;
var tail1Id = 11;
var tail2Id = 24;

//Dog 2 Vars
var torsoId1 = 12;
var headId1  = 13;
var head1Id1 = 13;
var head2Id1 = 22;
var leftFrontUpperLegId1 = 14;//leftupperarm
var leftFrontLowerLegId1 = 15;//leftlowerarm
var rightFrontUpperLegId1 = 16;//rightupperarm
var rightFrontLowerLegId1 = 17;//rightLowerArm
var leftBackUpperLegId1 = 18;//leftupprerleg
var leftBackLowerLegId1 = 19;//leftlowerleg
var rightBackUpperLegId1 = 20;//rightupperleg
var rightBackLowerLegId1 = 21;//rightlowerleg
var tailId1 = 23;
var tail1Id1 = 23;
var tail2Id1 = 25;

var torsoHeight = 3.0;
var torsoWidth = 4.5;
var upperLegWidth  = 0.5;
var lowerLegWidth  = 0.3;
var lowerLegHeight = 1.0;
var upperLegHeight = 1.75;
var headHeight = 1.5;
var headWidth = 1.0;
var tailHeight = 2.5;
var tailWidth = 0.25;

var numNodes = 26;
var numAngles = 27;
var theta = [35, 3.5, leftFrontLeg, 3, rightFrontLeg, -3, leftBackLeg, 3, rightBackLeg, -3, 2.0, 0, -35, -4.0, leftFrontLeg1, 3, rightFrontLeg1, -3, leftBackLeg1, 3, rightBackLeg1, -3, -2.0, 0, wag, wag1];
var stack = [];
var figure = [];

for( var i=0; i<numNodes; i++) figure[i] = createNode(null, null, null, null);

// Add buffer and array for normals
//
var vBuffer;
var pointsArray = [];
var normalsArray = [];

var c;

//dog1flags
var jumpFlag = true;
var jumpFlagUp = true;
var jumpFlagDown = false;
var wagFlag = true;
var wagFlagLeft = true;
var wagFlagRight = false;
var walkForwardFlag = true;
var walkBackwardFlag = true;
var leftLegSwingForwardFlag = true;
var leftLegSwingBackwardFlag = false;
var rightLegSwingForwardFlag = false;
var rightLegSwingBackwardFlag = true;
var resetFlag = true;

//dog2flags
var jumpFlag1 = true;
var jumpFlagUp1 = true;
var jumpFlagDown1 = false;
var wagFlag1 = true;
var wagFlagLeft1 = true;
var wagFlagRight1 = false;
var walkForwardFlag1 = true;
var walkBackwardFlag1 = true;
var leftLegSwingForwardFlag1 = true;
var leftLegSwingBackwardFlag1 = false;
var rightLegSwingForwardFlag1 = false;
var rightLegSwingBackwardFlag1 = true;
var resetFlag1 = true;

//-------------------------------------------
function scale4(a, b, c) {
   var result = mat4();
   result[0][0] = a;
   result[1][1] = b;
   result[2][2] = c;
   return result;
}

//--------------------------------------------
function createNode(transform, render, sibling, child){
    var node = {
    transform: transform,
    render: render,
    sibling: sibling,
    child: child,
    }
    return node;
}

function initNodes(Id) {
    var m = mat4();

    switch(Id) {
		
		/********************************
		*****   DOG 1(Left Side)    *****
		*********************************/
		
    case torsoId:
		m = mult(scalem(.75,.75,.75),rotate(theta[torsoId], 0, 1, 0 ));
		figure[torsoId] = createNode( m, body, null, tailId );
    break;
	case tailId:
	case tail1Id:
	case tail2Id:
		m = translate(-(torsoWidth-4.35), torsoHeight-0.1, -2);
		m = mult(m, rotate(theta[tail1Id], 1, 0, 0));
		m = mult(m, rotate(theta[tail2Id], 0, 0, 1));
		figure[tailId] = createNode( m, tail, headId, null );
    break;
    case headId:
    case head1Id:
    case head2Id:
		m = translate(0.0, torsoHeight+0.55*headHeight, 1.75);
		m = mult(m, rotate(theta[head1Id], 1, 0, 0))
		m = mult(m, rotate(theta[head2Id], 0, 1, 0));
		m = mult(m, translate(0.0, -0.5*headHeight, 0.0));
		figure[headId] = createNode( m, head, leftFrontUpperLegId, null);
    break;
    case leftFrontUpperLegId:
		m = translate(-(torsoWidth-3), (torsoHeight-2.85), 2);
		m = mult(m, rotate(theta[leftFrontUpperLegId], 1, 0, 0));
		figure[leftFrontUpperLegId] = createNode( m, leftFrontUpperLeg, rightFrontUpperLegId, leftFrontLowerLegId );
    break;
    case rightFrontUpperLegId:
		m = translate(torsoWidth-3, torsoHeight-2.85, 2);
		m = mult(m, rotate(theta[rightFrontUpperLegId], 1, 0, 0));
		figure[rightFrontUpperLegId] = createNode( m, rightFrontUpperLeg, leftBackUpperLegId, rightFrontLowerLegId );
    break;
    case leftBackUpperLegId:
		m = translate(-(torsoWidth-3), torsoHeight-2.85, -2);
		m = mult(m , rotate(theta[leftBackUpperLegId], 1, 0, 0));
		figure[leftBackUpperLegId] = createNode( m, leftBackUpperLeg, rightBackUpperLegId, leftBackLowerLegId );
    break;
    case rightBackUpperLegId:
		m = translate(torsoWidth-3, torsoHeight-2.85, -2);
		m = mult(m, rotate(theta[rightBackUpperLegId], 1, 0, 0));
		figure[rightBackUpperLegId] = createNode( m, rightBackUpperLeg, null, rightBackLowerLegId );
    break;
    case leftFrontLowerLegId:
		m = translate(0.0, upperLegHeight, 0.0);
		m = mult(m, rotate(theta[leftFrontLowerLegId], 1, 0, 0));
		figure[leftFrontLowerLegId] = createNode( m, leftFrontLowerLeg, null, null );
    break;
    case rightFrontLowerLegId:
		m = translate(0.0, upperLegHeight, 0.0);
		m = mult(m, rotate(theta[rightFrontLowerLegId], 1, 0, 0));
		figure[rightFrontLowerLegId] = createNode( m, rightFrontLowerLeg, null, null );
    break;
    case leftBackLowerLegId:
		m = translate(0.0, upperLegHeight, 0.0);
		m = mult(m, rotate(theta[leftBackLowerLegId], 1, 0, 0));
		figure[leftBackLowerLegId] = createNode( m, leftBackLowerLeg, null, null );
    break;
    case rightBackLowerLegId:
		m = translate(0.0, upperLegHeight, 0.0);
		m = mult(m, rotate(theta[rightBackLowerLegId], 1, 0, 0));
		figure[rightBackLowerLegId] = createNode( m, rightBackLowerLeg, null, null );
    break;

		/********************************
		*****   DOG 2(Right Side)   *****
		*********************************/
		
	case torsoId1:
		m = mult(scalem(.75,.75,.75),rotate(theta[torsoId1], 0, 1, 0 ));
		figure[torsoId1] = createNode( m, body1, null, tailId1 );
	break;
	case tailId1:
	case tail1Id1:
	case tail2Id1:
		m = translate(-(torsoWidth-4.35), torsoHeight-0.1, -2);
		m = mult(m, rotate(theta[tail1Id1], 1, 0, 0));
		m = mult(m, rotate(theta[tail2Id1], 0, 0, 1));
		figure[tailId1] = createNode( m, tail1, headId1, null );
	break;
	case headId1:
    case head1Id1:
    case head2Id1:
		m = translate(0.0, torsoHeight+0.55*headHeight, 1.75);
		m = mult(m, rotate(theta[head1Id1], 1, 0, 0))
		m = mult(m, rotate(theta[head2Id1], 0, 1, 0));
		m = mult(m, translate(0.0, -0.5*headHeight, 0.0));
		figure[headId1] = createNode( m, head1, leftFrontUpperLegId1, null);
    break;
    case leftFrontUpperLegId1:
		m = translate(-(torsoWidth-3), (torsoHeight-2.85), 2);
		m = mult(m, rotate(theta[leftFrontUpperLegId1], 1, 0, 0));
		figure[leftFrontUpperLegId1] = createNode( m, leftFrontUpperLeg1, rightFrontUpperLegId1, leftFrontLowerLegId1 );
    break;
    case rightFrontUpperLegId1:
		m = translate(torsoWidth-3, torsoHeight-2.85, 2);
		m = mult(m, rotate(theta[rightFrontUpperLegId1], 1, 0, 0));
		figure[rightFrontUpperLegId1] = createNode( m, rightFrontUpperLeg1, leftBackUpperLegId1, rightFrontLowerLegId1 );
    break;
    case leftBackUpperLegId1:
		m = translate(-(torsoWidth-3), torsoHeight-2.85, -2);
		m = mult(m , rotate(theta[leftBackUpperLegId1], 1, 0, 0));
		figure[leftBackUpperLegId1] = createNode( m, leftBackUpperLeg1, rightBackUpperLegId1, leftBackLowerLegId1 );
    break;
    case rightBackUpperLegId1:
		m = translate(torsoWidth-3, torsoHeight-2.85, -2);
		m = mult(m, rotate(theta[rightBackUpperLegId1], 1, 0, 0));
		figure[rightBackUpperLegId1] = createNode( m, rightBackUpperLeg1, null, rightBackLowerLegId1 );
    break;
    case leftFrontLowerLegId1:
		m = translate(0.0, upperLegHeight, 0.0);
		m = mult(m, rotate(theta[leftFrontLowerLegId1], 1, 0, 0));
		figure[leftFrontLowerLegId1] = createNode( m, leftFrontLowerLeg1, null, null );
    break;
    case rightFrontLowerLegId1:
		m = translate(0.0, upperLegHeight, 0.0);
		m = mult(m, rotate(theta[rightFrontLowerLegId1], 1, 0, 0));
		figure[rightFrontLowerLegId1] = createNode( m, rightFrontLowerLeg1, null, null );
    break;
    case leftBackLowerLegId1:
		m = translate(0.0, upperLegHeight, 0.0);
		m = mult(m, rotate(theta[leftBackLowerLegId1], 1, 0, 0));
		figure[leftBackLowerLegId1] = createNode( m, leftBackLowerLeg1, null, null );
    break;
    case rightBackLowerLegId1:
		m = translate(0.0, upperLegHeight, 0.0);
		m = mult(m, rotate(theta[rightBackLowerLegId1], 1, 0, 0));
		figure[rightBackLowerLegId1] = createNode( m, rightBackLowerLeg1, null, null );
    break;
    }
}

function traverse(Id) {
   if(Id == null) return;
   stack.push(modelViewMatrix);
   modelViewMatrix = mult(modelViewMatrix, figure[Id].transform);
   figure[Id].render();
   if(figure[Id].child != null) traverse(figure[Id].child);
    modelViewMatrix = stack.pop();
   if(figure[Id].sibling != null) traverse(figure[Id].sibling);
}

//----------------------------------------------------------------------------

function head(){
	var s = scale4(headWidth, headHeight, headWidth);
    var instanceMatrix = mult( translate( 0.0, 0.5 * headHeight, 0.0 ), s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function head1(){
	var s = scale4(headWidth, headHeight, headWidth);
    var instanceMatrix = mult( translate( 0.0, 0.5 * headHeight, 0.0 ), s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function body(){
	var s = scale4(torsoWidth, torsoHeight, torsoWidth);
    var instanceMatrix = mult( translate( 0.0, 0.5 * torsoHeight, 0.0 ), s);
	//Left Dog Jump
	if(!jumpFlag){
		if(jumpFlagUp && !jumpFlagDown){
			y+=0.1;
			if(y>3.0){
				jumpFlagUp = false;
				jumpFlagDown = true;
			}
		}if(!jumpFlagUp && jumpFlagDown){
			y-=0.1;
			if(y<0.0){
				jumpFlagUp = true;
				jumpFlagDown = false;
			}
		}
	}else y=0.0;	
	//Left Dog Move in +x Direction When Walking Forward
	if(!walkForwardFlag){
		x += 0.01;	
		if(x >= -4.0){
			walkForwardFlag = !walkForwardFlag;
		}
	}
	//Left Dog Move in -x Direction When Walking Backward
	if(!walkBackwardFlag){
		x -= 0.01;
		if(x <= -12.0){
			walkBackwardFlag = !walkBackwardFlag
		}
	}
	//Reset Left Dog
	if(!resetFlag){
		jumpFlag = true;
		resetFlag = true;
		wagFlag = true;
		walkForwardFlag = true;
		walkBackwardFlag = true;
		resetFlag = true;
		wag = 0.0;
	}
	modelViewMatrix = mult(modelViewMatrix, translate(x,y,z));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function body1(){
	var s = scale4(torsoWidth, torsoHeight, torsoWidth);
    var instanceMatrix = mult( translate( 0.0, 0.5 * torsoHeight, 0.0 ), s);
	//Right Dog Jump
	if(!jumpFlag1){
		if(jumpFlagUp1 && !jumpFlagDown1){
			y1+=0.1;
			if(y1>3.1){
				jumpFlagUp1 = false;
				jumpFlagDown1 = true;
			}
		}if(!jumpFlagUp1 && jumpFlagDown1){
			y1-=0.1;
			if(y1<0.0){
				jumpFlagUp1 = true;
				jumpFlagDown1 = false;
			}
		}
	}else y1=0.0;
	//Right Dog Move in -x Direction When Walking Forward
	if(!walkForwardFlag1){
		//walkBackwardFlag1 = !walkBackwardFlag1;
		x1 -= 0.01;
		if(x1 <= 4.0){
			walkForwardFlag1 = !walkForwardFlag1;
		}
	}
	//Right Dog Move in +x Direction When Walking Backward
	else if(!walkBackwardFlag1){
		x1 += 0.01;
		if(x1 >= 12.0){
			walkBackwardFlag1 = !walkBackwardFlag1;
		}
	}
	//Reset Right Dog
	if(!resetFlag1){
		jumpFlag1 = true;
		resetFlag1 = true;
		wagFlag1 = true;
		walkForwardFlag1 = true;
		walkBackwardFlag1 = true;
		resetFlag1 = true;
		wag1 = 0.0;
	}
	modelViewMatrix = mult(modelViewMatrix, translate(x1,y1,z1));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------
function leftFrontUpperLeg() {
    var s = scale4(upperLegWidth, upperLegHeight, upperLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * upperLegHeight, 0.0 ),s);
	//Walk Forward Leg Movement
	if(!walkForwardFlag){
		if(leftLegSwingForwardFlag && !leftLegSwingBackwardFlag){
			leftFrontLeg -= 1.0;
			if(leftFrontLeg < 45){
				leftLegSwingForwardFlag = false;
				leftLegSwingBackwardFlag = true;
			}
		}if(!leftLegSwingForwardFlag && leftLegSwingBackwardFlag){
			leftFrontLeg += 1.0;
			if(leftFrontLeg > 135){
				leftLegSwingForwardFlag = true;
				leftLegSwingBackwardFlag = false;
			}
		}
	}
	////Walk Backward Leg Movement
	else if(!walkBackwardFlag){
		if(leftLegSwingForwardFlag && !leftLegSwingBackwardFlag){
			leftFrontLeg -= 1.0;
			if(leftFrontLeg < 45){
				leftLegSwingForwardFlag = false;
				leftLegSwingBackwardFlag = true;
			}
		}if(!leftLegSwingForwardFlag && leftLegSwingBackwardFlag){
			leftFrontLeg += 1.0;
			if(leftFrontLeg > 135){
				leftLegSwingForwardFlag = true;
				leftLegSwingBackwardFlag = false;
			}
		}
	}else leftFrontLeg = 90;//Legs Straight When Standing Still
	
	theta[leftFrontUpperLegId] = leftFrontLeg;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[leftFrontUpperLegId], 1,0,0));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function leftFrontUpperLeg1() {
    var s = scale4(upperLegWidth, upperLegHeight, upperLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * upperLegHeight, 0.0 ),s);
	//Walk Forward Leg Movement
	if(!walkForwardFlag1){
		if(leftLegSwingForwardFlag1 && !leftLegSwingBackwardFlag1){
			leftFrontLeg1 -= 1.0;
			if(leftFrontLeg1 < 45){
				leftLegSwingForwardFlag1 = false;
				leftLegSwingBackwardFlag1 = true;
			}
		}if(!leftLegSwingForwardFlag1 && leftLegSwingBackwardFlag1){
			leftFrontLeg1 += 1.0;
			if(leftFrontLeg1 > 135){
				leftLegSwingForwardFlag1 = true;
				leftLegSwingBackwardFlag1 = false;
			}
		}
	}
	//Walk Backward Leg Movement
	else if(!walkBackwardFlag1){
		if(leftLegSwingForwardFlag1 && !leftLegSwingBackwardFlag1){
			leftFrontLeg1 -= 1.0;
			if(leftFrontLeg1 < 45){
				leftLegSwingForwardFlag1 = false;
				leftLegSwingBackwardFlag1 = true;
			}
		}if(!leftLegSwingForwardFlag1 && leftLegSwingBackwardFlag1){
			leftFrontLeg1 += 1.0;
			if(leftFrontLeg1 > 135){
				leftLegSwingForwardFlag1 = true;
				leftLegSwingBackwardFlag1 = false;
			}
		}
	}else leftFrontLeg1 = 90;//Legs Straight When Standing Still
	theta[leftFrontUpperLegId1] = leftFrontLeg1;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[leftFrontUpperLegId1], 1,0,0));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function rightFrontUpperLeg() {
    var s = scale4(upperLegWidth, upperLegHeight, upperLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * upperLegHeight, 0.0 ),s);
	//Walk Forward Leg Movement
	if(!walkForwardFlag){
		if(!rightLegSwingForwardFlag && rightLegSwingBackwardFlag){
			rightFrontLeg += 1.0;
			if(rightFrontLeg > 135){
				rightLegSwingForwardFlag = true;
				rightLegSwingBackwardFlag = false;
			}
		}if(rightLegSwingForwardFlag && !rightLegSwingBackwardFlag){
			rightFrontLeg -= 1.0;
			if(rightFrontLeg < 45){
				rightLegSwingForwardFlag = false;
				rightLegSwingBackwardFlag = true;
			}
		}
	}
	//Walk Backward Leg Movement
	else if(!walkBackwardFlag){
		if(!rightLegSwingForwardFlag && rightLegSwingBackwardFlag){
			rightFrontLeg += 1.0;
			if(rightFrontLeg > 135){
				rightLegSwingForwardFlag = true;
				rightLegSwingBackwardFlag = false;
			}
		}if(rightLegSwingForwardFlag && !rightLegSwingBackwardFlag){
			rightFrontLeg -= 1.0;
			if(rightFrontLeg < 45){
				rightLegSwingForwardFlag = false;
				rightLegSwingBackwardFlag = true;
			}
		}
	}else rightFrontLeg = 90;//Legs Straight When Standing Still
	theta[rightFrontUpperLegId] = rightFrontLeg;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[rightFrontUpperLegId], 1,0,0));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}
//----------------------------------------------------------------------------

function rightFrontUpperLeg1() {
    var s = scale4(upperLegWidth, upperLegHeight, upperLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * upperLegHeight, 0.0 ),s);
	//Walk Forward Leg Movement
	if(!walkForwardFlag1){
		if(!rightLegSwingForwardFlag1 && rightLegSwingBackwardFlag1){
			rightFrontLeg1 += 1.0;
			if(rightFrontLeg1 > 135){
				rightLegSwingForwardFlag1 = true;
				rightLegSwingBackwardFlag1 = false;
			}
		}if(rightLegSwingForwardFlag1 && !rightLegSwingBackwardFlag1){
			rightFrontLeg1 -= 1.0;
			if(rightFrontLeg1 < 45){
				rightLegSwingForwardFlag1 = false;
				rightLegSwingBackwardFlag1 = true;
			}
		}
	}
	//Walk Forward Leg Movement
	else if(!walkBackwardFlag1){
		if(!rightLegSwingForwardFlag1 && rightLegSwingBackwardFlag1){
			rightFrontLeg1 += 1.0;
			if(rightFrontLeg1 > 135){
				rightLegSwingForwardFlag1 = true;
				rightLegSwingBackwardFlag1 = false;
			}
		}if(rightLegSwingForwardFlag1 && !rightLegSwingBackwardFlag1){
			rightFrontLeg1 -= 1.0;
			if(rightFrontLeg1 < 45){
				rightLegSwingForwardFlag1 = false;
				rightLegSwingBackwardFlag1 = true;
			}
		}
	}else rightFrontLeg1 = 90;//Legs Straight When Standing Still
	theta[rightFrontUpperLegId1] = rightFrontLeg1;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[rightFrontUpperLegId1], 1,0,0));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}
//----------------------------------------------------------------------------

function leftBackUpperLeg() {
    var s = scale4(upperLegWidth, upperLegHeight, upperLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * upperLegHeight, 0.0 ),s);
	//Walk Forward Leg Movement
	if(!walkForwardFlag){
		if(leftLegSwingForwardFlag && !leftLegSwingBackwardFlag){
			leftBackLeg -= 1.0;
			if(leftBackLeg < 45){
				leftLegSwingForwardFlag = false;
				leftLegSwingBackwardFlag = true;
			}
		}if(!leftLegSwingForwardFlag && leftLegSwingBackwardFlag){
			leftBackLeg += 1.0;
			if(leftBackLeg > 135){
				leftLegSwingForwardFlag = true;
				leftLegSwingBackwardFlag = false;
			}
		}
	}
	//Walk Forward Leg Movement
	else if(!walkBackwardFlag){
		if(leftLegSwingForwardFlag && !leftLegSwingBackwardFlag){
			leftBackLeg -= 1.0;
			if(leftBackLeg < 45){
				leftLegSwingForwardFlag = false;
				leftLegSwingBackwardFlag = true;
			}
		}if(!leftLegSwingForwardFlag && leftLegSwingBackwardFlag){
			leftBackLeg += 1.0;
			if(leftBackLeg > 135){
				leftLegSwingForwardFlag = true;
				leftLegSwingBackwardFlag = false;
			}
		}
	}else leftBackLeg = 90;//Legs Straight When Standing Still
	theta[leftBackUpperLegId] = leftBackLeg;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[leftBackUpperLegId], 1,0,0))
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}
//----------------------------------------------------------------------------
function leftBackUpperLeg1() {
    var s = scale4(upperLegWidth, upperLegHeight, upperLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * upperLegHeight, 0.0 ),s);
	//Walk Forward Leg Movement
	if(!walkForwardFlag1){
		if(leftLegSwingForwardFlag1 && !leftLegSwingBackwardFlag1){
			leftBackLeg1 -= 1.0;
			if(leftBackLeg1 < 45){
				leftLegSwingForwardFlag1 = false;
				leftLegSwingBackwardFlag1 = true;
			}
		}if(!leftLegSwingForwardFlag1 && leftLegSwingBackwardFlag1){
			leftBackLeg1 += 1.0;
			if(leftBackLeg1 > 135){
				leftLegSwingForwardFlag1 = true;
				leftLegSwingBackwardFlag1 = false;
			}
		}
	}
	//Walk Forward Leg Movement
	else if(!walkBackwardFlag1){
		if(leftLegSwingForwardFlag1 && !leftLegSwingBackwardFlag1){
			leftBackLeg1 -= 1.0;
			if(leftBackLeg1 < 45){
				leftLegSwingForwardFlag1 = false;
				leftLegSwingBackwardFlag1 = true;
			}
		}if(!leftLegSwingForwardFlag1 && leftLegSwingBackwardFlag1){
			leftBackLeg1 += 1.0;
			if(leftBackLeg1 > 135){
				leftLegSwingForwardFlag1 = true;
				leftLegSwingBackwardFlag1 = false;
			}
		}
	}else leftBackLeg1 = 90;//Legs Straight When Standing Still
	theta[leftBackUpperLegId1] = leftBackLeg1;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[leftBackUpperLegId1], 1,0,0))
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}
//----------------------------------------------------------------------------

function rightBackUpperLeg() {
    var s = scale4(upperLegWidth, upperLegHeight, upperLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * upperLegHeight, 0.0 ),s);
	//Walk Forward Leg Movement
	if(!walkForwardFlag){
		if(!rightLegSwingForwardFlag && rightLegSwingBackwardFlag){
			rightBackLeg += 1.0;
			if(rightBackLeg > 135){
				rightLegSwingForwardFlag = true;
				rightLegSwingBackwardFlag = false;
			}
		}if(rightLegSwingForwardFlag && !rightLegSwingBackwardFlag){
			rightBackLeg -= 1.0;
			if(rightBackLeg < 45){
				rightLegSwingForwardFlag = false;
				rightLegSwingBackwardFlag = true;
			}
		}
	}
	//Walk Forward Leg Movement
	else if(!walkBackwardFlag){
		if(!rightLegSwingForwardFlag && rightLegSwingBackwardFlag){
			rightBackLeg += 1.0;
			if(rightBackLeg > 135){
				rightLegSwingForwardFlag = true;
				rightLegSwingBackwardFlag = false;
			}
		}if(rightLegSwingForwardFlag && !rightLegSwingBackwardFlag){
			rightBackLeg -= 1.0;
			if(rightBackLeg < 45){
				rightLegSwingForwardFlag = false;
				rightLegSwingBackwardFlag = true;
			}
		}
	}else rightBackLeg = 90;//Legs Straight When Standing Still
	theta[rightBackUpperLegId] = rightBackLeg;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[rightBackUpperLegId], 1,0,0));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}
//----------------------------------------------------------------------------

function rightBackUpperLeg1() {
    var s = scale4(upperLegWidth, upperLegHeight, upperLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * upperLegHeight, 0.0 ),s);
	//Walk Forward Leg Movement
	if(!walkForwardFlag1){
		if(!rightLegSwingForwardFlag1 && rightLegSwingBackwardFlag1){
			rightBackLeg1 += 1.0;
			if(rightBackLeg1 > 135){
				rightLegSwingForwardFlag1 = true;
				rightLegSwingBackwardFlag1 = false;
			}
		}if(rightLegSwingForwardFlag1 && !rightLegSwingBackwardFlag1){
			rightBackLeg1 -= 1.0;
			if(rightBackLeg1 < 45){
				rightLegSwingForwardFlag1 = false;
				rightLegSwingBackwardFlag1 = true;
			}
		}
	}
	//Walk Forward Leg Movement
	else if(!walkBackwardFlag1){
		if(!rightLegSwingForwardFlag1 && rightLegSwingBackwardFlag1){
			rightBackLeg1 += 1.0;
			if(rightBackLeg1 > 135){
				rightLegSwingForwardFlag1 = true;
				rightLegSwingBackwardFlag1 = false;
			}
		}if(rightLegSwingForwardFlag1 && !rightLegSwingBackwardFlag1){
			rightBackLeg1 -= 1.0;
			if(rightBackLeg1 < 45){
				rightLegSwingForwardFlag1 = false;
				rightLegSwingBackwardFlag1 = true;
			}
		}
	}else rightBackLeg1 = 90;
	theta[rightBackUpperLegId1] = rightBackLeg1;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[rightBackUpperLegId1], 1,0,0));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}
//----------------------------------------------------------------------------

function leftFrontLowerLeg() {
    var s = scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * lowerLegHeight, 0.0 ),s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function leftFrontLowerLeg1() {
    var s = scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * lowerLegHeight, 0.0 ),s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function rightFrontLowerLeg() {
    var s = scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * lowerLegHeight, 0.0 ),s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------
function rightFrontLowerLeg1() {
    var s = scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * lowerLegHeight, 0.0 ),s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function leftBackLowerLeg() {
    var s = scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * lowerLegHeight, 0.0 ),s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function leftBackLowerLeg1() {
    var s = scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * lowerLegHeight, 0.0 ),s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function rightBackLowerLeg() {
    var s = scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * lowerLegHeight, 0.0 ),s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function rightBackLowerLeg1() {
    var s = scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * lowerLegHeight, 0.0 ),s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function tail() {
    var s = scale4(tailWidth, tailHeight, tailWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * tailHeight, 0.0 ),s);
	//Left Dog Tail Wag
	if(!wagFlag){
		if(wagFlagLeft && !wagFlagRight){
			wag-=2.5;
			if(wag<-35.0){
				wagFlagLeft = false;
				wagFlagRight = true;
			}
		}if(!wagFlagLeft && wagFlagRight){
			wag+=2.5;
			if(wag>25.0){
				wagFlagLeft = true;
				wagFlagRight = false;
			}
		}
	}
	theta[tail2Id] = wag;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[tail2Id], 0, 0, 1));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function tail1() {
    var s = scale4(tailWidth, tailHeight, tailWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * tailHeight, 0.0 ),s);
	//Right Dog Tail Wag
	if(!wagFlag1){
		if(wagFlagLeft1 && !wagFlagRight1){
			wag1-=2.5;
			if(wag1<-35.0){
				wagFlagLeft1 = false;
				wagFlagRight1 = true;
			}
		}if(!wagFlagLeft1 && wagFlagRight1){
			wag1+=2.5;
			if(wag1>25.0){
				wagFlagLeft1 = true;
				wagFlagRight1 = false;
			}
		}
	}	
	theta[tail2Id1] = wag1;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[tail2Id1], 0, 0, 1));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function quad(a, b, c, d) {
	// Add code for normals
	var t1 = subtract(vertices[b], vertices[a]);
    var t2 = subtract(vertices[c], vertices[b]);
    var normal = cross(t1, t2);
    var normal = vec3(normal);
	
    pointsArray.push(vertices[a]);
	normalsArray.push(normal);
    pointsArray.push(vertices[b]);
	normalsArray.push(normal);
    pointsArray.push(vertices[c]);
	normalsArray.push(normal);
    pointsArray.push(vertices[d]);
	normalsArray.push(normal);
}

function cube(){
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.8, 0.7, 0.8, 1.0 );

	// Enable the depth test
	gl.enable(gl.DEPTH_TEST);
    //
    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader");
	//
    gl.useProgram( program);
	
    instanceMatrix = mat4();
	projectionMatrix = ortho(-10.0,10.0,-10.0, 10.0,-10.0,10.0);
    modelViewMatrix = mat4();
	
    gl.uniformMatrix4fv(gl.getUniformLocation( program, "modelViewMatrix"), false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( gl.getUniformLocation( program, "projectionMatrix"), false, flatten(projectionMatrix) );

    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");

    cube();

	//Create and bind buffer for normals
    var nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW );

    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal );
	//
	
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	// Add ambient, diffuse, and specular products
    var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);
	//
	
	document.getElementById("WalkForward1").onclick = function(){walkForwardFlag = !walkForwardFlag; walkBackwardFlag = true;};
    document.getElementById("WalkBackward1").onclick = function(){walkBackwardFlag = !walkBackwardFlag; walkForwardFlag = true;};
    document.getElementById("Wag1").onclick = function(){wagFlag = !wagFlag;};
	document.getElementById("Jump1").onclick = function(){jumpFlag = !jumpFlag;};
	document.getElementById("WalkForward2").onclick = function(){walkForwardFlag1 = !walkForwardFlag1; walkBackwardFlag1 = true;};
    document.getElementById("WalkBackward2").onclick = function(){walkBackwardFlag1 = !walkBackwardFlag1; walkForwardFlag1 = true;};
    document.getElementById("Wag2").onclick = function(){wagFlag1 = !wagFlag1;};
	document.getElementById("Jump2").onclick = function(){jumpFlag1 = !jumpFlag1};
	document.getElementById("Reset").onclick = function(){resetFlag = !resetFlag; resetFlag1 = !resetFlag1;};
    document.getElementById("slider1").onchange = function(event) {
        theta[torsoId] = event.target.value;
		initNodes(torsoId);
    };
    document.getElementById("slider2").onchange = function(event) {
        theta[torsoId1] = event.target.value;
		initNodes(torsoId1);
	};

	// Send uniform locations for lighting and material properties
	gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
       flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
       flatten(diffuseProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"),
       flatten(specularProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"),
       flatten(lightPosition) );
	gl.uniform1f(gl.getUniformLocation(program,
       "shininess"),materialShininess);
	//
	
    for(i=0; i<numNodes; i++) initNodes(i);

    render();
}

var render = function() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
	
    traverse(torsoId);	//traverse and draw nodes 0-11 and 24(left dog)
	traverse(torsoId1);	//traverse and draw nodes 12-23 and 25(right dog)

    requestAnimFrame(render);
}
