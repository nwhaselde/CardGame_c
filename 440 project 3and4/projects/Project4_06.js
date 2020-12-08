"use strict";

var canvas;
var gl;
var program;

//x y and z axes positions
var x = 0;
var y = 0;
var z = 0;
var x1 = 0;
var y1 = 0;
var z1 = 0;
var x2 = 0;
var y2 = 0;
var z2 = 0;
var x3 = 0;
var y3 = 0;
var z3 = 0;
var xdog = 0;
var ydog = 0;
var zdog = 0;

//tail angles
var wag = 0;
var wag1 = 0;
var dogbody = 0;
var doghead = 0;

//dog upper leg angles
var leftFrontLeg = 0;
var leftBackLeg = 0;
var rightFrontLeg = 0;
var rightBackLeg = 0;
var leftFrontLeg1 = 180;
var leftBackLeg1 = 180;
var rightFrontLeg1 = 180;
var rightBackLeg1 = 180;

//left guy body part angles
var body = 0;
var leftuparm = -25;
var leftuparmy = 130;
var leftuparmz = -45;
var rightuparm = 180;
var rightuparmy = -20;
var rightuparmz = 0;
var leftupleg = 0;
var leftuplegy = 0;
var leftuplegz = 90;
var rightupleg = 0;
var rightuplegy = 0;
var rightuplegz = 0;
var leftlowarm = 90;
var leftlowarmy = 0;
var rightlowarm = -110;
var rightlowarmy = 0;
var leftlowleg = 0;
var rightlowleg = 0;
var hips = 0;
var hipsy = 0;
var hipsz = 0;
var dome = 0;
var domey = 0;
var domez = 0;
var guitar = 0;
var guitary = 0;
var guitarz = 0;


//right guy body angles
var rightuparm1 = -32;
var leftuparm1 = 155;
var rightuparmy1 = 200;
var rightuparmz1 = -95;
var leftupleg1 = 0;
var leftuplegy1 = 0;
var leftuplegz1 = 0;
var rightupleg1 = 0;
var rightuplegy1 = 0;
var rightuplegz1 = 0;
var rightlowarm1 = -90;
var leftlowarm1 = -130;
var leftlowleg1 = 0;
var leftlowlegy1 = 0;
var leftlowlegz1 = 0;
var rightlowleg1 = 0;
var rightlowlegy1 = 0;
var rightlowlegz1 = 0;
var hips1 = 0;
var hipsy1 = 0;
var hipsz1 = 0;
var dome1 = 0;
var domey1 = 0;
var domez1 = 0;
var guitar1 = 0;
var guitary1 = 0;
var guitarz1 = 0;
var guitarforward1 = 0;

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
var lightPosition = vec4(1.0, 3.0, 3.0, 0.0 );
var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

var materialAmbient = vec4( 1.0, 0.0, 1.0, 1.0 );
var materialDiffuse = vec4( 1.0, 0.8, 0.0, 1.0);
var materialSpecular = vec4( 1.0, 0.8, 0.0, 1.0 );
var materialShininess = 100.0;

var ra = 1.0;//ambient red		
var ga = 0.0;//ambient green	
var ba = 1.0;//ambient blue		
	
var r = 1.0;//diffues red
var g = 0.8;//diffuse green
var b = 0.0;//diffuse blue

var rs = 1.0;
var gs = 0.8;
var bs = 0.0;

var ctm;
var ambientColor, diffuseColor, specularColor;
var modelView, projection;
var viewerPos;
var lightPositionLoc,diffuseLoc, ambientLoc, specularLoc;//lightPosition and color location vars
var ambientProduct;
var diffuseProduct;
var specularProduct;

//Person 1 Vars
var torsoId = 0;
var headId  = 1;
var head1Id = 1;
var head2Id = 10;
var leftUpperArmId = 2;//leftupperarm
var leftLowerArmId = 3;//leftlowerarm
var rightUpperArmId = 4;//rightupperarm
var rightLowerArmId = 5;//rightLowerArm
var leftUpperLegId = 6;//leftupprerleg
var leftLowerLegId = 7;//leftlowerleg
var rightUpperLegId = 8;//rightupperleg
var rightLowerLegId = 9;//rightlowerleg

//Person 2 Vars
var torsoId1 = 26;
var headId1 = 27;
var head1Id1 = 27;
var head2Id1 = 36;
var leftUpperArmId1 = 28;//leftupperarm
var leftLowerArmId1 = 29;//leftlowerarm
var rightUpperArmId1 = 30;//rightupperarm
var rightLowerArmId1 = 31;//rightLowerArm
var leftUpperLegId1 = 32;//leftupprerleg
var leftLowerLegId1 = 33;//leftlowerleg
var rightUpperLegId1 = 34;//rightupperleg
var rightLowerLegId1 = 35;//rightlowerleg

//Dog Vars
var dogTorsoId = 12;
var dogHeadId = 13;
var dogHead1Id = 13;
var dogHead2Id = 22;
var leftFrontUpperLegId = 14;//leftupperarm
var leftFrontLowerLegId = 15;//leftlowerarm
var rightFrontUpperLegId = 16;//rightupperarm
var rightFrontLowerLegId = 17;//rightLowerArm
var leftBackUpperLegId = 18;//leftupprerleg
var leftBackLowerLegId = 19;//leftlowerleg
var rightBackUpperLegId = 20;//rightupperleg
var rightBackLowerLegId = 21;//rightlowerleg
var tailId = 23;
var tail1Id= 23;
var tail2Id = 25;

//Guitar Vars
var guitarBodyId = 37;
var guitarNeckId = 38;
var guitarHeadstockId = 39;
var guitarBodyId1 = 40;
var guitarNeckId1 = 41;
var guitarHeadstockId1 = 42;

var dogTorsoHeight = 3.0;
var dogTorsoWidth = 4.5;
var dogUpperLegWidth  = 0.5;
var dogLowerLegWidth  = 0.3;
var dogLowerLegHeight = 1.0;
var dogUpperLegHeight = 1.75;
var dogHeadHeight = 1.5;
var dogHeadWidth = 1.0;
var tailHeight = 2.5;
var tailWidth = 0.25;

var torsoHeight = 5.0;
var torsoWidth = 1.25;
var upperArmHeight = 3.0;
var lowerArmHeight = 2.0;
var upperArmWidth  = 0.2;
var lowerArmWidth  = 0.5;
var upperLegWidth  = 0.5;
var lowerLegWidth  = 0.5;
var lowerLegHeight = 2.0;
var upperLegHeight = 3.0;
var headHeight = 1.5;
var headWidth = .75;
var headHeight1 = 1.75;
var headWidth1 = 1.5;

var guitarBodyHeight = 5.0;
var guitarBodyWidth = 2.0;
var guitarNeckHeight = 5.0;
var guitarNeckWidth = 1.0;
var guitarHeadstockHeight = 2.0;
var guitarHeadstockWidth = 1.6;


var numNodes = 50;
var numAngles = 51;
var theta = [35, 3.5, 0, 3, 0, -3, 180, 3, 180, -3, 2.0, 0, -45, -4.0, leftFrontLeg1, 3, rightFrontLeg1, -3, leftBackLeg1, 3, rightBackLeg1, -3, -2.0, 0, wag, wag1, -35, 3.5, 0, 3, 0, -3, 180, 3, 180, -3, 2.0, -60.0, 0.0, 0.0, 45.0, 0, 0];
var stack = [];
var figure = [];

for( var i=0; i<numNodes; i++) figure[i] = createNode(null, null, null, null);

// Add buffer and array for normals
//
var vBuffer;
var pointsArray = [];
var normalsArray = [];

var c;

//flags
var play = true;
var play1 = true;
var play2 = false;
var play3 = false;
var play4 = false;
var playa = true;
var play1a = true;
var play2a = false;
var playb = true;
var play1b = true;
var play2b = false;
var playc = true;
var play1c = true;
var play2c = false;
var playd = true;
var play1d = true;
var play2d = false;

var brutal = true;
var brutal1 = true;
var brutal2 = false;
var brutala = true;
var brutal1a = true;
var brutal2a = false;
var brutalb = true;
var brutal1b = true;
var brutal2b = false;
var brutalc = true;
var brutal1c = true;
var brutal2c = false;
var brutald = true;
var brutal1d = true;
var brutal2d = false;

var math = true;
var math1 = true;
var math2 = false;
var matha = true;
var math1a = true;
var math2a = false;
var mathb = true;
var math1b = true;
var math2b = false;
var mathc = true;
var math1c = true;
var math2c = false;
var mathd = true;
var math1d = true;
var math2d = false;

var breakup = true;
var breakup1 = true;
var breakup2 = false;
var breakup3 = false;
var breakup4 = false;
var breakupa = true;
var breakup1a = true;
var breakup2a = false;
var breakup3a = false;
var breakup4a = false;

var resetflag = true;

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
		****   Person 1(Left Side)   ****
		*********************************/
		
    case torsoId:
		m = rotate(theta[torsoId], 0, 1, 0 );
		m = mult(m, translate(-8, -3, 0));
		m = mult(m, scalem(.85,.85,.85));
		figure[torsoId] = createNode( m, torso, null, headId );
    break;
    case headId:
    case head1Id:
    case head2Id:
		m = translate(0.0, torsoHeight+0.5*headHeight, 0.0);
		m = mult(m, rotate(theta[head1Id], 1, 0, 0))
		m = mult(m, rotate(theta[head2Id], 0, 1, 0));
		m = mult(m, translate(0.0, -0.5*headHeight, 0.0));
		figure[headId] = createNode( m, head, leftUpperArmId, null);
    break;
    case leftUpperArmId:
		m = translate(-(torsoWidth+upperArmWidth), 0.9*torsoHeight, 0.0);
		m = mult(m, rotate(theta[leftUpperArmId], 1, 0, 0));
		figure[leftUpperArmId] = createNode( m, leftUpperArm, rightUpperArmId, leftLowerArmId );
    break;
    case rightUpperArmId:
		m = translate(torsoWidth+upperArmWidth, 0.9*torsoHeight, 0.0);
		m = mult(m, rotate(theta[rightUpperArmId], 1, 0, 0));
		figure[rightUpperArmId] = createNode( m, rightUpperArm, leftUpperLegId, rightLowerArmId );
    break;
    case leftUpperLegId:
		m = translate(-(torsoWidth+upperLegWidth), 0.1*upperLegHeight, 0.0);
		m = mult(m , rotate(theta[leftUpperLegId], 1, 0, 0));
		figure[leftUpperLegId] = createNode( m, leftUpperLeg, rightUpperLegId, leftLowerLegId );
    break;
    case rightUpperLegId:
		m = translate(torsoWidth+upperLegWidth, 0.1*upperLegHeight, 0.0);
		m = mult(m, rotate(theta[rightUpperLegId], 1, 0, 0));
		figure[rightUpperLegId] = createNode( m, rightUpperLeg, guitarBodyId, rightLowerLegId );
    break;
    case leftLowerArmId:
		m = translate(0.0, upperArmHeight, 0.0);
		m = mult(m, rotate(theta[leftLowerArmId], 1, 0, 0));
		figure[leftLowerArmId] = createNode( m, leftLowerArm, null, null );
    break;
    case rightLowerArmId:
		m = translate(0.0, upperArmHeight, 0.0);
		m = mult(m, rotate(theta[rightLowerArmId], 1, 0, 0));
		figure[rightLowerArmId] = createNode( m, rightLowerArm, null, null );
    break;
    case leftLowerLegId:
		m = translate(0.0, upperLegHeight, 0.0);
		m = mult(m, rotate(theta[leftLowerLegId], 1, 0, 0));
		figure[leftLowerLegId] = createNode( m, leftLowerLeg, null, null );
    break;
    case rightLowerLegId:
		m = translate(0.0, upperLegHeight, 0.0);
		m = mult(m, rotate(theta[rightLowerLegId], 1, 0, 0));
		figure[rightLowerLegId] = createNode( m, rightLowerLeg, null, null );
    break;
	
		/********************************
		************   DOG   ************
		*********************************/
		
	case dogTorsoId:
		m = mult(scalem(.65,.65,.65),rotate(theta[dogTorsoId], 0, 1, 0 ));
		m = mult(m, translate(16, -10, -0.5))
		figure[dogTorsoId] = createNode( m, body1, null, tailId );
	break;
	case tailId:
	case tail1Id:
	case tail2Id:
		m = translate(-(dogTorsoWidth-4.35), dogTorsoHeight-0.1, -2);
		m = mult(m, rotate(theta[tail1Id], 1, 0, 0));
		m = mult(m, rotate(theta[tail2Id], 0, 0, 1));
		figure[tailId] = createNode( m, tail1, dogHeadId, null );
	break;
	case dogHeadId:
    case dogHead1Id:
    case dogHead2Id:
		m = translate(0.0, dogTorsoHeight+0.55*dogHeadHeight, 1.75);
		m = mult(m, rotate(theta[dogHead1Id], 1, 0, 0))
		m = mult(m, rotate(theta[dogHead2Id], 0, 1, 0));
		m = mult(m, translate(0.0, -0.5*dogHeadHeight, 0.0));
		figure[dogHeadId] = createNode( m, head1, leftFrontUpperLegId, null);
    break;
    case leftFrontUpperLegId:
		m = translate(-(dogTorsoWidth-3), (dogTorsoHeight-2.85), 2);
		m = mult(m, rotate(theta[leftFrontUpperLegId], 1, 0, 0));
		figure[leftFrontUpperLegId] = createNode( m, leftFrontUpperLeg1, rightFrontUpperLegId, leftFrontLowerLegId );
    break;
    case rightFrontUpperLegId:
		m = translate(dogTorsoWidth-3, dogTorsoHeight-2.85, 2);
		m = mult(m, rotate(theta[rightFrontUpperLegId], 1, 0, 0));
		figure[rightFrontUpperLegId] = createNode( m, rightFrontUpperLeg1, leftBackUpperLegId, rightFrontLowerLegId );
    break;
    case leftBackUpperLegId:
		m = translate(-(dogTorsoWidth-3), dogTorsoHeight-2.85, -2);
		m = mult(m , rotate(theta[leftBackUpperLegId], 1, 0, 0));
		figure[leftBackUpperLegId] = createNode( m, leftBackUpperLeg1, rightBackUpperLegId, leftBackLowerLegId );
    break;
    case rightBackUpperLegId:
		m = translate(dogTorsoWidth-3, dogTorsoHeight-2.85, -2);
		m = mult(m, rotate(theta[rightBackUpperLegId], 1, 0, 0));
		figure[rightBackUpperLegId] = createNode( m, rightBackUpperLeg1, null, rightBackLowerLegId );
    break;
    case leftFrontLowerLegId:
		m = translate(0.0, dogUpperLegHeight, 0.0);
		m = mult(m, rotate(theta[leftFrontLowerLegId], 1, 0, 0));
		figure[leftFrontLowerLegId] = createNode( m, leftFrontLowerLeg1, null, null );
    break;
    case rightFrontLowerLegId:
		m = translate(0.0, dogUpperLegHeight, 0.0);
		m = mult(m, rotate(theta[rightFrontLowerLegId], 1, 0, 0));
		figure[rightFrontLowerLegId] = createNode( m, rightFrontLowerLeg1, null, null );
    break;
    case leftBackLowerLegId:
		m = translate(0.0, dogUpperLegHeight, 0.0);
		m = mult(m, rotate(theta[leftBackLowerLegId], 1, 0, 0));
		figure[leftBackLowerLegId] = createNode( m, leftBackLowerLeg1, null, null );
    break;
    case rightBackLowerLegId:
		m = translate(0.0, dogUpperLegHeight, 0.0);
		m = mult(m, rotate(theta[rightBackLowerLegId], 1, 0, 0));
		figure[rightBackLowerLegId] = createNode( m, rightBackLowerLeg1, null, null );
    break;
	
		/********************************
		***** PERSON 2 (Right Side) *****
		*********************************/
		
	case torsoId1:
		m = rotate(theta[torsoId1], 0, 1, 0 );
		m = mult(m, translate(6, -3, 0));
		m = mult(m, scalem(.85,.85,.85));
		figure[torsoId1] = createNode( m, torso1, null, headId1 );
    break;
    case headId1:
    case head1Id1:
    case head2Id1:
		m = translate(0.0, torsoHeight+0.5*headHeight, 0.0);
		m = mult(m, rotate(theta[head1Id1], 1, 0, 0))
		m = mult(m, rotate(theta[head2Id1], 0, 1, 0));
		m = mult(m, translate(0.0, -0.5*headHeight, 0.0));
		figure[headId1] = createNode( m, head2, leftUpperArmId1, null);
    break;
    case leftUpperArmId1:
		m = translate(-(torsoWidth+upperArmWidth), 0.9*torsoHeight, 0.0);
		m = mult(m, rotate(theta[leftUpperArmId1], 1, 0, 0));
		figure[leftUpperArmId1] = createNode( m, leftUpperArm1, rightUpperArmId1, leftLowerArmId1 );
    break;
    case rightUpperArmId1:
		m = translate(torsoWidth+upperArmWidth, 0.9*torsoHeight, 0.0);
		m = mult(m, rotate(theta[rightUpperArmId1], 1, 0, 0));
		figure[rightUpperArmId1] = createNode( m, rightUpperArm1, leftUpperLegId1, rightLowerArmId1 );
    break;
    case leftUpperLegId1:
		m = translate(-(torsoWidth+upperLegWidth), 0.1*upperLegHeight, 0.0);
		m = mult(m , rotate(theta[leftUpperLegId1], 1, 0, 0));
		figure[leftUpperLegId1] = createNode( m, leftUpperLeg1, rightUpperLegId1, leftLowerLegId1 );
    break;
    case rightUpperLegId1:
		m = translate(torsoWidth+upperLegWidth, 0.1*upperLegHeight, 0.0);
		m = mult(m, rotate(theta[rightUpperLegId1], 1, 0, 0));
		figure[rightUpperLegId1] = createNode( m, rightUpperLeg1, guitarBodyId1, rightLowerLegId1 );
    break;
    case leftLowerArmId1:
		m = translate(0.0, upperArmHeight, 0.0);
		m = mult(m, rotate(theta[leftLowerArmId1], 1, 0, 0));
		figure[leftLowerArmId1] = createNode( m, leftLowerArm1, null, null );
    break;
    case rightLowerArmId1:
		m = translate(0.0, upperArmHeight, 0.0);
		m = mult(m, rotate(theta[rightLowerArmId1], 1, 0, 0));
		figure[rightLowerArmId1] = createNode( m, rightLowerArm1, null, null );
    break;
    case leftLowerLegId1:
		m = translate(0.0, upperLegHeight, 0.0);
		m = mult(m, rotate(theta[leftLowerLegId1], 1, 0, 0));
		figure[leftLowerLegId1] = createNode( m, leftLowerLeg1, null, null );
    break;
    case rightLowerLegId1:
		m = translate(0.0, upperLegHeight, 0.0);
		m = mult(m, rotate(theta[rightLowerLegId1], 1, 0, 0));
		figure[rightLowerLegId1] = createNode( m, rightLowerLeg1, null, null );
    break;
	
		/********************************
		*********    Guitar1     ********
		*********************************/
		
	case guitarBodyId:
		m = rotate(theta[guitarBodyId], 0, 0, 1 );
		m = mult(m, translate(-1.10, -2, 1.0));
		m = mult(m, scalem(.7,.7,.7));
		figure[guitarBodyId] = createNode( m, guitarBody, null, guitarNeckId );
    break;
    case guitarNeckId:
		m = translate(0.0, guitarBodyHeight + 2.0, 0.0);
		m = mult(m, rotate(theta[guitarNeckId], 1, 0, 0))
		m = mult(m, translate(0.0, -0.5*guitarNeckHeight, 0.0));
		figure[guitarNeckId] = createNode( m, guitarNeck, guitarHeadstockId, null);
    break;
    case guitarHeadstockId:
		m = translate(0.0, guitarNeckHeight+guitarBodyHeight-1, 0.0);
		m = mult(m, rotate(theta[guitarHeadstockId], 1, 0, 0));
		figure[guitarHeadstockId] = createNode( m, guitarHeadstock, null, null );
    break;
	
		/********************************
		*********    Guitar2     ********
		*********************************/
		
	case guitarBodyId1:
		m = rotate(theta[guitarBodyId1], 0, 0, 1 );
		m = mult(m, translate(0.5, -1.0, 1.0));
		m = mult(m, scalem(.7,.7,.7));
		figure[guitarBodyId1] = createNode( m, guitarBody1, null, guitarNeckId1 );
    break;
    case guitarNeckId1:
		m = translate(0.0, guitarBodyHeight + 2.0, 0.0);
		m = mult(m, rotate(theta[guitarNeckId1], 1, 0, 0))
		m = mult(m, translate(0.0, -0.5*guitarNeckHeight, 0.0));
		figure[guitarNeckId1] = createNode( m, guitarNeck1, guitarHeadstockId1, null);
    break;
    case guitarHeadstockId1:
		m = translate(0.0, guitarNeckHeight+guitarBodyHeight-1, 0.0);
		m = mult(m, rotate(theta[guitarHeadstockId1], 1, 0, 0));
		figure[guitarHeadstockId1] = createNode( m, guitarHeadstock1, null, null );
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
	theta[headId] = dome;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[headId],1,0,0));
	theta[headId] = domey;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[headId],0,0,1));
	theta[headId] = domez;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[headId],0,1,0));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function head1(){
	var s = scale4(dogHeadWidth, dogHeadHeight, dogHeadWidth);
    var instanceMatrix = mult( translate( 0.0, 0.5 * dogHeadHeight, 0.0 ), s);
	theta[dogHeadId] = doghead;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[dogHeadId], 1, 0, 0));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------
function head2(){
	var s = scale4(headWidth1, headHeight1, headWidth1);
    var instanceMatrix = mult( translate( 0.0, 0.5 * headHeight, 0.0 ), s);
	theta[headId1] = dome1;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[headId1], 1,0,0));
	theta[headId1] = domey1;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[headId1],0,0,1));
	theta[headId1] = domez1;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[headId1],0,1,0));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function torso(){
	var s = scale4(torsoWidth, torsoHeight, torsoWidth);
    var instanceMatrix = mult( translate( 0.0, 0.5 * torsoHeight, 0.0 ), s);
	if(!playc){

		leftuplegy = 15;
		leftlowleg = -10;
		rightuplegy = -15;
		rightlowleg = 10;

		if(play1c && !play2c){
			r -= 0.01;
			g += 0.01;
			b += 0.01;
			hips += 0.5;
			leftupleg -= 0.5;
			leftlowleg -= 0.5;
			rightupleg -= 0.5;
			rightlowleg -= 0.5;
			dome += 1;
			domey += 1;
			domez += 1;
			wag += 0.5;
			if(hips > 15){
				play1c = false;
				play2c = true;
			}
		}if(!play1c && play2c){
			r += 0.01;
			g -= 0.01;
			b -= 0.01;
			hips -= 0.5;
			leftupleg += 0.5;
			leftlowleg += 0.5;
			rightupleg += 0.5;
			rightlowleg += 0.5;
			dome -= 1;
			domey -= 1;
			domez -= 1;
			wag -= 0.5;
			if(hips < -15){
				play1c = true;
				play2c = false;
			}
		}
	}if(!brutalc){

		hips = -5;
		leftuplegy = 25;
		rightuplegy = -25;
		rightuplegz = -5;
		leftlowleg = -25;
		rightlowleg = 25;
		if(brutal1c && !brutal2c){
			dome += 4;
			hipsz += 1;
			leftupleg +=1;
			rightupleg -=1;
			ydog -= 0.1;
			wag -= 5;
			if(dome >30){
				brutal1c = false;
				brutal2c = true;
			}
		}if(!brutal1c && brutal2c){
			dome -= 4;
			hipsz -= 1;
			leftupleg -=1;
			rightupleg +=1;
			ydog += 0.1;
			wag += 5;
			if(dome < -30){
				brutal1c = true;
				brutal2c = false;
			}
		}
	}if(!mathc){
		leftuplegz = 135;
		rightuplegz = -180;
		if(math1c && !math2c){
			domey += 1;
			hips += 0.15;
			leftupleg -= 0.15;
			rightupleg -= 0.15;
			leftlowleg += 0.15;
			rightlowleg += 0.15;
			wag += 1;
			if(domey > 20){
				math1c = false;
				math2c = true;
			}
		}if(!math1c && math2c){
			domey -= 1;
			hips -= 0.15;
			leftupleg += 0.15;
			rightupleg += 0.15;
			leftlowleg -= 0.15;
			rightlowleg -= 0.15;
			wag -= 1;
			if(domey < -20){
				math1c = true;
				math2c = false;
			}
		}
	}
	if(!breakup){
		play = true;
		playa = true;
		playb = true;
		playc = true;
		playd = true;
		brutal = true;
		brutala = true;
		brutalb = true;
		brutalc = true;
		brutald = true;
		math = true;
		matha = true;
		mathb = true;
		mathc = true;
		mathd = true;
		if(breakup1 && !breakup2 && !breakup3 && !breakup4){
			hipsz += 1;
			leftuparm += 1;
			leftlowarm -= 1;
			rightuparm -= 1;
			rightlowarm += 1;
			if(hipsz > 40){
				breakup1 = false;
				breakup2 = true;
				breakup3 = false;
				breakup4 = false;
			}
		}if(!breakup1 && breakup2 && !breakup3 && !breakup4){
			leftlowarm += 1;
			leftuparm -= 0.5
			leftuparmy -= 0.5
			rightlowarm += 1;
			rightuparm -= 0.5
			rightuparmy -= 0.5
			if(leftuparmy < 100){
				breakup1 = false;
				breakup2 = false;
				breakup3 = false;
				breakup4 = false;
			}
		}if(!breakup1 && !breakup2 && !breakup3 && !breakup4 ){
			leftlowarm -= 1;
			leftuparm += 0.5
			rightlowarm -= 1;
			rightuparm += 0.5;
			if(leftlowarm < -45){
				breakup1 = true;
				breakup2 = true;
				breakup3 = false;
				breakup4 = false;
			}
		}if(breakup1 && breakup2 && !breakup3 && !breakup4){
			rightuparm += 0.5;
			rightlowarm +=1.5;
			leftuparm += 0.1;
			if(rightlowarm > 60){
				breakup1 = false;
				breakup2 = true;
				breakup3 = true;
				breakup4 = false;
			}
		}if(!breakup1 && breakup2 && breakup3 && !breakup4 ){
			y-=0.01;
			dome += 0.05;
			leftupleg -= 0.2;
			rightupleg -=0.2;
			leftlowleg += 0.2;
			rightlowleg += 0.2;
			rightuparmz += 0.1
			rightuparmy -= 0.15;
			rightuparm += 0.1;
			leftuparm += 0.1;
			leftuparmy -= 0.15;
			guitar += 0.1;
			y2 -= 0.1;
			if(y  < -6){
				breakup1 = true;
				breakup2 = false;
				breakup3 = true;
				breakup4 = false;
			}
		}if(breakup1 && !breakup2 && breakup3 && !breakup4){
			xdog -= 0.025;
			leftBackLeg += 1;
			rightBackLeg -= 1;
			leftFrontLeg += 1;
			rightFrontLeg -= 1;
			if(xdog < -20){
				breakup1 = false;
				breakup2 = false;
				breakup3 = true;
				breakup4 = false;
			}if(leftBackLeg > 30){
				breakup1 = false;
				breakup2 = false;
				breakup3 = true;
				breakup4 = true;
			}
		}if(!breakup1 && !breakup2 && breakup3 && breakup4){
			xdog -= 0.025;
			leftBackLeg -= 1;
			rightBackLeg += 1;
			leftFrontLeg -= 1;
			rightFrontLeg += 1;
			if(xdog < -20){
				breakup1 = false;
				breakup2 = false;
				breakup3 = true;
				breakup4 = false;
			}if(leftBackLeg < -30){
				breakup1 = true;
				breakup2 = false;
				breakup3 = true;
				breakup4 = false;
			}
		}if(!breakup1 && !breakup2 && breakup3 && !breakup4){
			dome = 3;
			if(leftuparm > 110){
				leftuparm -= 1;
			}else{leftuparm = 110;}
			if(rightuparm < -75){
				rightuparm -= 1;
			}else{rightuparm = -75;}
			rightuparmz = 45;
			rightuparmy = 240;
			leftBackLeg = 0;
			rightBackLeg = 0;
			leftFrontLeg = 0;
			rightFrontLeg = 0;
			leftlowarm += 1;
			rightlowarm -= 0.5;
			wag += 1;
			if(leftlowarm >-30){
				breakup1 = true;
				breakup2 = true;
				breakup3 = true;
				breakup4 = false;
			}
		}if(breakup1 && breakup2 && breakup3 && !breakup4){
			leftlowarm -= 1;
			rightlowarm += 0.5;
			wag -= 1;
			if(leftlowarm < -60){
				breakup1 = false;
				breakup2 = false;
				breakup3 = true;
				breakup4 = false;
			}
		}
	}if(!resetflag){
		//reset flags
		play = true;
		play1 = true;
		play2 = false;
		play3 = false;
		play4 = false;
		playa = true;
		play1a = true;
		play2a = false;
		playb = true;
		play1b = true;
		play2b = false;
		playc = true;
		play1c = true;
		play2c = false;
		playd = true;
		play1d = true;
		play2d = false;

		brutal = true;
		brutal1 = true;
		brutal2 = false;
		brutala = true;
		brutal1a = true;
		brutal2a = false;
		brutalb = true;
		brutal1b = true;
		brutal2b = false;
		brutalc = true;
		brutal1c = true;
		brutal2c = false;
		brutald = true;
		brutal1d = true;
		brutal2d = false;
	
		math = true;
		math1 = true;
		math2 = false;
		matha = true;	
		math1a = true;
		math2a = false;
		mathb = true;
		math1b = true;
		math2b = false;
		mathc = true;
		math1c = true;
		math2c = false;
		mathd = true;
		math1d = true;
		math2d = false;
	
		breakup = true;
		breakup1 = true;
		breakup2 = false;
		breakup3 = false;
		breakup4 = false;
		breakupa = true;
		breakup1a = true;
		breakup2a = false;
		breakup3a = false;
		breakup4a = false;
	
		resetflag = true;
		
		//reset left guy
		y = 0;
		body = 0;
		leftuparm = -25;
		leftuparmy = 130;
		leftuparmz = -45;
		rightuparm = 180;
		rightuparmy = -20;
		rightuparmz = 0;
		leftupleg = 0;	
		leftuplegy = 0;
		leftuplegz = 90;
		rightupleg = 0;
		rightuplegy = 0;
		rightuplegz = 0;
		leftlowarm = 90;
		leftlowarmy = 0;
		rightlowarm = -110;
		rightlowarmy = 0;
		leftlowleg = 0;
		rightlowleg = 0;
		hips = 0;
		hipsy = 0;
		hipsz = 0;
		dome = 0;
		domey = 0;
		domez = 0;
		guitar = 0;
		guitary	 = 0;
		guitarz = 0;
			
		//reset right guy
		x1 = 0;
		rightuparm1 = -32;
		leftuparm1 = 155;
		rightuparmy1 = 200;
		rightuparmz1 = -95;
		leftupleg1 = 0;
		leftuplegy1 = 0;
		leftuplegz1 = 0;
		rightupleg1 = 0;
		rightuplegy1 = 0;
		rightuplegz1 = 0;
		rightlowarm1 = -90;
		leftlowarm1 = -130;
		leftlowleg1 = 0;
		leftlowlegy1 = 0;
		leftlowlegz1 = 0;
		rightlowleg1 = 0;
		rightlowlegy1 = 0;
		rightlowlegz1 = 0;
		hips1 = 0;
		hipsy1 = 0;
		hipsz1 = 0;
		dome1 = 0;
		domey1 = 0;
		domez1 = 0;
		guitar1 = 0;
		guitary1 = 0;
		guitarz1 = 0;
		guitarforward1 = 0;
		
		//reset dog
		xdog = 0;
		ydog = 0;
		wag = 0;
		dogbody = 0;
		leftBackLeg = 0;
		rightBackLeg = 0;
		rightFrontLeg = 0;
		leftFrontLeg = 0;
		doghead = 0;

		//reset guitar
		y2 = 0;
		
		//reset color
		ra = 1.0;
		ga = 0.0;
		ba = 1.0;
		r = 1.0;
		g = 0.8;
		b = 0.0;
		rs = 1.0;
		gs = 0.8;
		bs = 0.0;
	}
	modelViewMatrix = mult(modelViewMatrix, translate(x,y,z));
	theta[torsoId] = hips;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[torsoId], 1, 0, 0));
	theta[torsoId] = hipsy;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[torsoId], 0, 0, 1));
	theta[torsoId] = hipsz;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[torsoId], 0, 1, 0));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function torso1(){
	var s = scale4(torsoWidth, torsoHeight, torsoWidth);
    var instanceMatrix = mult( translate( 0.0, 0.5 * torsoHeight, 0.0 ), s);
	if(!playd){
		leftuplegy1 = -15;
		leftlowleg1 = 10;
		rightuplegy1 = -15;
		rightlowleg1 = 10;
		if(play1d && !play2d){
			hips1 += 0.5;
			domey1 += 0.5;
			leftupleg1 -= 0.5;
			leftlowleg1 -= 0.5;
			rightupleg1 -= 0.5;
			rightlowleg1 -= 0.5;
			if(hips1 > 15){
				play1d = false;
				play2d = true;
			}
		}if(!play1d && play2d){
			hips1 -= 0.5;
			domey1 -= 0.5;
			leftupleg1 += 0.5;
			leftlowleg1 += 0.5;
			rightupleg1 += 0.5;
			rightlowleg1 += 0.5;
			if(hips1 < -15){
				play1d = true;
				play2d = false;
			}
		}
	}if(!brutald){
		hips1 = 5;
		leftuplegy1 = -45;
		rightuplegy1 = -20;
		rightuplegz1 = -30;
		leftlowleg1 = 30;
		rightlowleg1 = 25;
		if(brutal1d && !brutal2d){
			dome1 += 4;
			domez1 -= 1;
			hipsz1 +=0.5;
			if(dome1 >30){
				brutal1d = false;
				brutal2d = true;
			}
		}if(!brutal1d && brutal2d){
			dome1 -= 4;
			domez1 += 1;
			hipsz1 -= 0.5;
			if(dome1 < -30){
				brutal1d = true;
				brutal2d = false;
			}
		}
	}if(!mathd){
		rightuparm1 = -35;
		rightlowarm1 = -75;
		dome1 = 25;
		domey1 = 15;
		domez1 = -15;
	}if(!breakupa){
		if(breakup1a && !breakup2a && !breakup3a && !breakup4a){
			hipsz1 -= 1;
			rightuparm1 -= 1;
			rightlowarm1 += 1;
			if(hipsz1 < -40){
				breakup1a = false;
				breakup2a = true;
				breakup3a = false;
				breakup4a = false;
			}
		}if(!breakup1a && breakup2a && !breakup3a && !breakup4a){
			rightlowarm1 -= 1;
			if(rightlowarm1 < -90){
				breakup1a = false;
				breakup2a = false;
				breakup3a = false;
				breakup4a = false;
			}
		}if(!breakup1a && !breakup2a && !breakup3a && !breakup4a){
			rightlowarm1 += 1;
			if(rightlowarm1 > -45){
				breakup1a = true;
				breakup2a = true;
				breakup3a = true;
				breakup4a = true;
			}
		}if(breakup1a && breakup2a && breakup3a && breakup4a){
			rightlowarm1 -= 1;
			if(rightlowarm1 < -90){
				breakup1a = true;
				breakup2a = false;
				breakup3a = false;
				breakup4a = true;
			}
		}if(breakup1a && !breakup2a && !breakup3a && breakup4a){
			rightlowarm1 += 1;
			if(rightlowarm1 > -45){
				breakup1a = true;
				breakup2a = true;
				breakup3a = false;
				breakup4a = true;
			}
		}if(breakup1a && breakup2a && !breakup3a && breakup4a){
			rightlowarm1 -= 1;
			if(rightlowarm1 < -90){
				breakup1a = false;
				breakup2a = true;
				breakup3a = false;
				breakup4a = true;
			}
		}if(!breakup1a && breakup2a && !breakup3a && breakup4a){
			rightlowarm1 += 1;
			if(rightlowarm1 > -45){
				breakup1a = true;
				breakup2a = true;
				breakup3a = false;
				breakup4a = true;
			}
		}if(breakup1a && breakup2a && !breakup3a && breakup4a){
			rightlowarm1 -= 1;
			if(rightlowarm1 < 75){
				breakup1a = true;
				breakup2a = true;
				breakup3a = false;
				breakup4a = false;
			}
		}if(breakup1a && breakup2a && !breakup3a && !breakup4a){
			hipsz1 += 1;
			rightuparm1 += 0.5;
			//leftlowarm1 += 1;

			if(hipsz1 > 90){
				breakup1a = false;
				breakup2a = true;
				breakup3a = true;
				breakup4a = false;
			}

		}if(!breakup1a && breakup2a && breakup3a && !breakup4a){
			x1 += 0.025;
			rightupleg1 += 0.5;
			leftupleg1 -= 0.5;
			if(rightupleg1 > 40){
				breakup1a = false;
				breakup2a = false;
				breakup3a = false;
				breakup4a = true;
			}
		}if(!breakup1a && !breakup2a && !breakup3a && breakup4a){
			x1 += 0.025;
			rightupleg1 -= 0.5;
			leftupleg1 += 0.5;
			if(rightupleg1 < -30){
				breakup1a = false;
				breakup2a = true;
				breakup3a = true;
				breakup4a = false;
			}
		}
	}
	modelViewMatrix = mult(modelViewMatrix, translate(x1,y1,z1));
	theta[torsoId1] = hips1;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[torsoId1], 1,0,0));
	theta[torsoId1] = hipsy1;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[torsoId1], 0,0,1));
	theta[torsoId1] = hipsz1;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[torsoId1], 0,1,0));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function body1(){
	var s = scale4(dogTorsoWidth, dogTorsoHeight, dogTorsoWidth);
    var instanceMatrix = mult( translate( 0.0, 0.5 * dogTorsoHeight, 0.0 ), s);
	if(!playb){
		if(play1b && !play2b ){
			dogbody -= 0.75;
			leftBackLeg -= 0.75;
			rightBackLeg -=0.75; 
			rightFrontLeg += 0.75;
			leftFrontLeg += 0.75;
			doghead += 0.1;
			if(dogbody < -25){
				play1b = false;
				play2b = true;
			}
		}if(!play1b && play2b){
			dogbody = -25;
			leftBackLeg = -60;
			rightBackLeg = -60;
			rightFrontLeg = 15;
			leftFrontLeg = 15;
			doghead = 15;
		}
	}if(!mathb){
		if(math1b && !math2b ){
			dogbody -= 0.75;
			leftBackLeg -= 0.75;
			rightBackLeg -=0.75; 
			rightFrontLeg += 0.75;
			leftFrontLeg += 0.75;
			doghead += 0.1;
			if(dogbody < -25){
				math1b = false;
				math2b = true;
			}
		}if(!math1b && math2b){
			dogbody += 0.25;
			ydog -= 0.025;
			leftBackLeg -= 0.75;
			rightBackLeg -=0.75; 
			leftFrontLeg -= 1;
			rightFrontLeg -= 1;
			if(dogbody > 0){
				math1b = true;
				math2b = true;
			}
		}
	}
	modelViewMatrix = mult(modelViewMatrix, translate(xdog, ydog, zdog));
	theta[dogTorsoId] = dogbody;
	theta[leftBackUpperLegId] = leftBackLeg;
	theta[rightBackUpperLegId] = rightBackLeg;
	theta[leftFrontUpperLegId] = leftFrontLeg;
	theta[rightFrontUpperLegId] = rightFrontLeg;
	theta[dogHeadId] = doghead;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[dogTorsoId], 1, 0, 0));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------
function leftUpperArm() {
    var s = scale4(upperLegWidth, upperLegHeight, upperLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * upperLegHeight, 0.0 ),s);
	if(!play){
		if(play1 && !play2 && !play3 && !play4){
			leftuparmy += 1;
			leftlowarm -= 2;
			rightuparmy1 -= 1;
			rightlowarm1 += 2;
			if( leftuparmy > 175 ){
				play1 = false;
				play2 = true;
				play3 = false;
				play4 = false;
			}
		}if(!play1 && play2 && !play3 && !play4){
			leftuparmy -= 1.5;
			leftlowarm += 3;
			rightuparmy1 += 1.5;
			rightlowarm1 -= 3;
			if(leftuparmy < 135 ){
				play1 = true;
				play2 = true;
				play3 = false;
				play4 = false;
			}
		}if(play1 && play2 && !play3 && !play4){
			leftuparmy += 1.5;
			leftlowarm -= 3;
			rightuparmy1 -= 1.5;
			rightlowarm1 += 3;
			if(leftuparmy > 175){
				play1 = false;
				play2 = false;
				play3 = false;
				play4 = false;
			}
		}if(!play1 && !play2 && !play3 && !play4){
			leftuparmy -= 1.5;
			leftlowarm += 3;
			rightuparmy1 += 1.5;
			rightlowarm1 -= 3;
			if(leftuparmy < 135){
				play1 = true;
				play2 = false;
				play3 = true;
				play4 = false;
			}
		}if(play1 && !play2 && play3 && !play4){
			leftuparmy += 1.5;
			leftlowarm -= 3;
			rightuparmy1 -= 1.5;
			rightlowarm1 += 3;
			if(leftuparmy > 175){
				play1 = false;
				play2 = true;
				play3 = true;
				play4 = false;
			}
		}if(!play1 && play2 && play3 && !play4){
			leftuparmy -= 1.5;
			leftlowarm += 3;
			rightuparmy1 += 1.5;
			rightlowarm1 -= 3;
			if(leftuparmy < 135){
				play1 = false;
				play2 = false;
				play3 = true;
				play4 = false;
			}
		}if(!play1 && !play2 && play3 && !play4){
			leftuparmy += 0.75;
			leftlowarm -= 1.5;
			rightuparmy1 -= 0.75;
			rightlowarm1 += 1.5;
			if(leftuparmy > 175){
				play1 = true;
				play2 = true;
				play3 = true;
				play4 = false;
			}
		}if(play1 && play2 && play3 && !play4){
			leftuparmy -= 1.5;
			leftlowarm += 3;
			rightuparmy1 += 1.5;
			rightlowarm1 -= 3;
			if(leftuparmy < 135){
				play1 = true;
				play2 = false;
				play3 = false;
				play4 = true;
			}
		}if(play1 && !play2 && !play3 && play4){
			leftuparmy += 1;
			leftlowarm -= 2;
			rightuparmy1 -= 1;
			rightlowarm1 += 2;
			if(leftuparmy > 175){
				play1 = false;
				play2 = true;
				play3 = false;
				play4 = true;
			}
		}if(!play1 && play2 && !play3 && play4){
			leftuparmy -= 1;
			leftlowarm += 2;
			rightuparmy1 += 1;
			rightlowarm1 -= 2;
			if(leftuparmy < 135){
				play1 = true;
				play2 = false;
				play3 = false;
				play4 = false;
			}
		}
	}if(!brutal){
		if(brutal1 && !brutal2){
			leftuparmy += 2;
			leftlowarm -= 4;
			if( leftuparmy > 175 ){
				brutal1 = false;
				brutal2 = true;
			}
		}if(!brutal1 && brutal2){
			leftuparmy -= 2;
			leftlowarm += 4;
			if(leftuparmy < 135 ){
				brutal1 = true;
				brutal2 = false;
			}
		}
	}if(!math){
		if(math1 && !math2){
			leftuparmy += 4;
			leftlowarm -= 8;
			if(leftuparmy > 175){
				math1 = false;
				math2 = true;
			}
		}if(!math1 && math2){
			leftuparmy -= 2;
			leftlowarm += 4;
			if(leftuparmy < 135){
				math1 = true;
				math2 = false;
			}
		}
	}
	theta[leftUpperArmId] = leftuparm;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[leftUpperArmId], 1, 0, 0));
	theta[leftUpperArmId] = leftuparmy;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[leftUpperArmId], 0, 0, 1));
	theta[leftUpperArmId] = leftuparmz;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[leftUpperArmId], 0, 1, 0));

    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function leftUpperArm1() {
    var s = scale4(upperLegWidth, upperLegHeight, upperLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * upperLegHeight, 0.0 ),s);
	
	theta[leftUpperArmId1] = 155
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[leftUpperArmId1], 1, 0, 0));
	theta[leftUpperArmId1] = 50
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[leftUpperArmId1], 0, 0, 1));
	theta[leftUpperArmId1] = -15
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[leftUpperArmId1], 0, 1, 0));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function leftFrontUpperLeg1() {
    var s = scale4(dogUpperLegWidth, dogUpperLegHeight, dogUpperLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * dogUpperLegHeight, 0.0 ),s);
	theta[leftFrontUpperLegId] = leftFrontLeg;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[leftFrontUpperLegId], 1, 0, 0));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function rightUpperArm() {
    var s = scale4(upperLegWidth, upperLegHeight, upperLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * upperLegHeight, 0.0 ),s);
	
	theta[rightUpperArmId] = rightuparm;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[rightUpperArmId], 1, 0, 0));
	theta[rightUpperArmId] = rightuparmy;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[rightUpperArmId], 0, 0, 1));
	theta[rightUpperArmId] = rightuparmz;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[rightUpperArmId], 0, 1, 0));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}
//----------------------------------------------------------------------------

function rightUpperArm1() {
    var s = scale4(upperLegWidth, upperLegHeight, upperLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * upperLegHeight, 0.0 ),s);
	if(!brutala){
		r = 0.666;
		g = 0.0;
		b = 0.0;
		ra = 0.666;
		ga = 0.0;
		ba = 0.0;
		rs = 0.666;
		gs = 0.0;
		bs = 0.0;
		if(brutal1a && !brutal2a){
			rightuparmy1 += 2;
			rightlowarm1 -= 4;
			if( rightuparmy1 > 200 ){
				brutal1a = false;
				brutal2a = true;
			}
		}if(!brutal1a && brutal2a){
			rightuparmy1 -= 2;
			rightlowarm1 += 4;
			if(rightuparmy1 < 160 ){
				brutal1a = true;
				brutal2a = false;
			}
		}
	}if(!matha){
		r = 0.6;
		g = 0.6;
		b = 0.6;
		ra = 0.6;
		ga = 0.6;
		ba = 0.6;
		rs = 0.6;
		gs = 0.6;
		bs = 0.6;
		if(math1a && !math2a){
			rightuparmy1 += 1;
			if(rightuparmy1 > 175){
				math1a = false;
				math2a = true;
			}
		}if(!math1a && math2a){
			rightuparmy1 -= 1;
			if(rightuparmy1 < 155){
				math1a = true;
				math2a = false;
			}
		}
	}
	theta[rightUpperArmId1] = rightuparm1;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[rightUpperArmId1], 1, 0, 0));
	theta[rightUpperArmId1] = rightuparmy1;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[rightUpperArmId1], 0, 0, 1));
	theta[rightUpperArmId1] = rightuparmz1;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[rightUpperArmId1], 0, 1, 0));

    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}
//----------------------------------------------------------------------------


function rightFrontUpperLeg1() {
    var s = scale4(dogUpperLegWidth, dogUpperLegHeight, dogUpperLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * dogUpperLegHeight, 0.0 ),s);
	theta[rightFrontUpperLegId] = rightFrontLeg;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[rightFrontUpperLegId], 1, 0, 0));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}
//----------------------------------------------------------------------------

function leftUpperLeg() {
    var s = scale4(upperLegWidth, upperLegHeight, upperLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * upperLegHeight, 0.0 ),s);

	theta[leftUpperLegId] = leftupleg;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[leftUpperLegId], 1, 0, 0));
	theta[leftUpperLegId] = leftuplegy;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[leftUpperLegId], 0, 0, 1));
	theta[leftUpperLegId] = leftuplegz;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[leftUpperLegId], 0, 1, 0));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}
//----------------------------------------------------------------------------

function leftUpperLeg1() {
    var s = scale4(upperLegWidth, upperLegHeight, upperLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * upperLegHeight, 0.0 ),s);
	
	theta[leftUpperLegId1] = leftupleg1;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[leftUpperLegId1], 1,0,0));
	theta[leftUpperLegId1] = leftuplegy1;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[leftUpperLegId1], 1,0,0));
	theta[leftUpperLegId1] = leftuplegz1;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[leftUpperLegId1], 1,0,0));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}
//----------------------------------------------------------------------------
function leftBackUpperLeg1() {
    var s = scale4(dogUpperLegWidth, dogUpperLegHeight, dogUpperLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * dogUpperLegHeight, 0.0 ),s);
	theta[leftBackUpperLegId] = leftBackLeg; 
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[leftBackUpperLegId], 1,0,0));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}
//----------------------------------------------------------------------------

function rightUpperLeg() {
    var s = scale4(upperLegWidth, upperLegHeight, upperLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * upperLegHeight, 0.0 ),s);
		
	theta[rightUpperLegId] = rightupleg;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[rightUpperLegId], 1, 0, 0));
	theta[rightUpperLegId] = rightuplegy;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[rightUpperLegId], 0, 0, 1));
	theta[rightUpperLegId] = rightuplegz;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[rightUpperLegId], 0, 1, 0));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}
//----------------------------------------------------------------------------
function rightUpperLeg1() {
    var s = scale4(upperLegWidth, upperLegHeight, upperLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * upperLegHeight, 0.0 ),s);
	theta[rightUpperLegId1] = rightupleg1;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[rightUpperLegId1], 1,0,0));
	theta[rightUpperLegId1] = rightuplegy1;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[rightUpperLegId1], 0,0,1));
	theta[rightUpperLegId1] = rightuplegz1;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[rightUpperLegId1], 0,1,0));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}
//----------------------------------------------------------------------------

function rightBackUpperLeg1() {
    var s = scale4(dogUpperLegWidth, dogUpperLegHeight, dogUpperLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * dogUpperLegHeight, 0.0 ),s);
	theta[rightBackUpperLegId] = rightBackLeg;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[rightBackUpperLegId], 1, 0, 0));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}
//----------------------------------------------------------------------------

function leftLowerArm() {
    var s = scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * lowerLegHeight, 0.0 ),s);
	theta[leftLowerArmId] = leftlowarm;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[leftLowerArmId], 1, 0, 0));
	theta[leftLowerArmId] = leftlowarmy;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[leftLowerArmId], 0, 0, 1));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------
function leftLowerArm1() {
    var s = scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * lowerLegHeight, 0.0 ),s);
	theta[leftLowerArmId1] = leftlowarm1;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[leftLowerArmId1], 1, 0, 0));
    var t = mult(modelViewMatrix, instanceMatrix);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function leftFrontLowerLeg1() {
    var s = scale4(dogLowerLegWidth, dogLowerLegHeight, dogLowerLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * dogLowerLegHeight, 0.0 ),s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function rightLowerArm() {
    var s = scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * lowerLegHeight, 0.0 ),s);
	
	theta[rightLowerArmId] = rightlowarm;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[rightLowerArmId], 1, 0, 0));
	theta[rightLowerArmId] = rightlowarmy;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[rightLowerArmId], 0, 0, 1));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------
function rightLowerArm1() {
    var s = scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * lowerLegHeight, 0.0 ),s);
	theta[rightLowerArmId1] =rightlowarm1;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[rightLowerArmId1], 1, 0, 0));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------
function rightFrontLowerLeg1() {
    var s = scale4(dogLowerLegWidth, dogLowerLegHeight, dogLowerLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * dogLowerLegHeight, 0.0 ),s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function leftLowerLeg() {
    var s = scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * lowerLegHeight, 0.0 ),s);
	theta[leftLowerLegId] = leftlowleg;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[leftLowerLegId],0 ,0, 1));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function leftLowerLeg1() {
    var s = scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * lowerLegHeight, 0.0 ),s);
	theta[leftLowerLegId1] = leftlowleg1;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[leftLowerLegId1], 1,0,0));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function leftBackLowerLeg1() {
    var s = scale4(dogLowerLegWidth, dogLowerLegHeight, dogLowerLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * dogLowerLegHeight, 0.0 ),s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function rightLowerLeg() {
    var s = scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * lowerLegHeight, 0.0 ),s);
	theta[rightLowerLegId] = rightlowleg;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[rightLowerLegId],1, 0, 0));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function rightLowerLeg1() {
    var s = scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * lowerLegHeight, 0.0 ),s);
	theta[rightLowerLegId1] = rightlowleg1;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[rightLowerLegId1], 1,0,0));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function rightBackLowerLeg1() {
    var s = scale4(dogLowerLegWidth, dogLowerLegHeight, dogLowerLegWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * dogLowerLegHeight, 0.0 ),s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function tail() {
    var s = scale4(tailWidth, tailHeight, tailWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * tailHeight, 0.0 ),s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function tail1() {
    var s = scale4(tailWidth, tailHeight, tailWidth);
    var instanceMatrix = mult(translate( 0.0, 0.5 * tailHeight, 0.0 ),s);
	theta[tail2Id] = wag;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[tail2Id],0,0,1));
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
	for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//----------------------------------------------------------------------------

function guitarBody() {
	var s = scale4(guitarBodyWidth, guitarBodyHeight, guitarBodyWidth);
	var instanceMatrix = mult(translate( 0.0, 0.5*guitarBodyHeight, 0.0), s);
	modelViewMatrix = mult(modelViewMatrix, translate(x2,y2,z2));
	theta[guitarBodyId] = guitar;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[guitarBodyId], 1, 0, 0));
	theta[guitarBodyId] = guitary;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[guitarBodyId], 0, 0, 1));
	theta[guitarBodyId] = guitarz;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[guitarBodyId], 0, 1, 0));
	var t = mult(modelViewMatrix, instanceMatrix);
	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
	for(var i = 0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}
//----------------------------------------------------------------------------

function guitarNeck() {
	var s = scale4(guitarNeckWidth, guitarNeckHeight, guitarNeckWidth);
	var instanceMatrix = mult(translate( 0.0, 0.5*guitarNeckHeight, 0.0), s);
	var t = mult(modelViewMatrix, instanceMatrix);
	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
	for(var i = 0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}
//----------------------------------------------------------------------------

function guitarHeadstock() {
	var s = scale4(guitarHeadstockWidth, guitarHeadstockHeight, guitarHeadstockWidth);
	var instanceMatrix = mult(translate( 0.0, 0.5*guitarHeadstockHeight, 0.0), s);
	var t = mult(modelViewMatrix, instanceMatrix);
	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
	for(var i = 0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}
//----------------------------------------------------------------------------

function guitarBody1() {
	var s = scale4(guitarBodyWidth, guitarBodyHeight, guitarBodyWidth);
	var instanceMatrix = mult(translate( 0.0, 0.5*guitarBodyHeight, 0.0), s);
	modelViewMatrix = mult(modelViewMatrix, translate(x3,y3,z3));
	theta[guitarBodyId1] = guitar1;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[guitarBodyId1], 1, 0, 0));
	theta[guitarBodyId1] = guitary1;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[guitarBodyId1], 0, 0, 1));
	theta[guitarBodyId1] = guitarz1;
	modelViewMatrix = mult(modelViewMatrix, rotate(theta[guitarBodyId1], 0, 1, 0));
	var t = mult(modelViewMatrix, instanceMatrix);
	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
	for(var i = 0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}
//----------------------------------------------------------------------------

function guitarNeck1() {
	var s = scale4(guitarNeckWidth, guitarNeckHeight, guitarNeckWidth);
	var instanceMatrix = mult(translate( 0.0, 0.5*guitarNeckHeight, 0.0), s);
	var t = mult(modelViewMatrix, instanceMatrix);
	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
	for(var i = 0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}
//----------------------------------------------------------------------------

function guitarHeadstock1() {
	var s = scale4(guitarHeadstockWidth, guitarHeadstockHeight, guitarHeadstockWidth);
	var instanceMatrix = mult(translate( 0.0, 0.5*guitarHeadstockHeight, 0.0), s);
	var t = mult(modelViewMatrix, instanceMatrix);
	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
	for(var i = 0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
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
    ambientProduct = mult(lightAmbient, materialAmbient);
    diffuseProduct = mult(lightDiffuse, materialDiffuse);
    specularProduct = mult(lightSpecular, materialSpecular);
	//
	
	document.getElementById("Funky").onclick = function(){play = !play; playa = !playa; playb = !playb; playc = !playc; playd = !playd};
    document.getElementById("MetalBros").onclick = function(){brutal = !brutal; brutala = !brutala; brutalc = !brutalc; brutald = !brutald;};
    document.getElementById("MathRock").onclick = function(){math = !math; matha = !matha; mathb = !mathb; mathc = !mathc; mathd = !mathd;};
	document.getElementById("BreakUp").onclick = function(){breakup = !breakup; breakupa = !breakupa};
	document.getElementById("Reset").onclick = function(){resetflag = !resetflag; };

	// Send uniform locations for lighting and material properties
	//gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
      // flatten(ambientProduct));
   // gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
     //  flatten(diffuseProduct) );
   // gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"),
      // flatten(specularProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"),
       flatten(lightPosition) );
	gl.uniform1f(gl.getUniformLocation(program,
       "shininess"),materialShininess);
	//
	diffuseLoc = gl.getUniformLocation(program, "diffuseProduct");//diffuseProduct can now be altered in render()
	ambientLoc = gl.getUniformLocation(program, "ambientProduct");//ambientProduct can now be altered in render()
	specularLoc = gl.getUniformLocation(program, "specularProduct");//
	
    for(i=0; i<numNodes; i++) initNodes(i);

    render();
}

var render = function() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
	
	materialDiffuse = [ r ,g, b, 1.0 ];
	materialAmbient = [ ra,ga,ba,1.0 ];
	ambientProduct = mult(lightAmbient, materialAmbient);
    diffuseProduct = mult(lightDiffuse, materialDiffuse);//This needed to be pulled from init() so that color can be updated on each frame.
	
	gl.uniform4fv(diffuseLoc, flatten(diffuseProduct));//uniform location of diffuseProduct
	gl.uniform4fv(ambientLoc, flatten(ambientProduct));//uniform location of ambientProduct
	gl.uniform4fv(specularLoc, flatten(specularProduct));
	
	traverse(torsoId);	//traverse and draw nodes 0-11 and 24(left dog)
	traverse(torsoId1);
	traverse(dogTorsoId);	//traverse and draw nodes 12-23 and 25(right dog)

    requestAnimFrame(render);
}
