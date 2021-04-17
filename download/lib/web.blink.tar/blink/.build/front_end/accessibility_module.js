WebInspector.AccessibilityModel=function(target)
{WebInspector.SDKModel.call(this,WebInspector.AccessibilityModel,target);this._agent=target.accessibilityAgent();};WebInspector.AccessibilityModel.prototype={getAXNode:function(nodeId)
{function parsePayload(error,value)
{if(error)
console.error("AccessibilityAgent.getAXNode(): "+error);return value||null;}
return this._agent.getAXNode(nodeId,parsePayload);},__proto__:WebInspector.SDKModel.prototype}
WebInspector.AccessibilityModel._symbol=Symbol("AccessibilityModel");WebInspector.AccessibilityModel.fromTarget=function(target)
{if(!target[WebInspector.AccessibilityModel._symbol])
target[WebInspector.AccessibilityModel._symbol]=new WebInspector.AccessibilityModel(target);return target[WebInspector.AccessibilityModel._symbol];};WebInspector.AccessibilitySidebarView=function()
{WebInspector.ThrottledWidget.call(this);this._computedTextSubPane=null;this._axNodeSubPane=null;this._node=null;this._sidebarPaneStack=null;WebInspector.context.addFlavorChangeListener(WebInspector.DOMNode,this._pullNode,this);this._pullNode();}
WebInspector.AccessibilitySidebarView.prototype={node:function()
{return this._node;},doUpdate:function()
{function accessibilityNodeCallback(accessibilityNode)
{if(this._computedTextSubPane)
this._computedTextSubPane.setAXNode(accessibilityNode);if(this._axNodeSubPane)
this._axNodeSubPane.setAXNode(accessibilityNode);}
var node=this.node();return WebInspector.AccessibilityModel.fromTarget(node.target()).getAXNode(node.id).then(accessibilityNodeCallback.bind(this))},wasShown:function()
{WebInspector.ThrottledWidget.prototype.wasShown.call(this);if(!this._sidebarPaneStack){this._computedTextSubPane=new WebInspector.AXComputedTextSubPane();this._computedTextSubPane.setNode(this.node());this._computedTextSubPane.show(this.element);this._computedTextSubPane.expand();this._axNodeSubPane=new WebInspector.AXNodeSubPane();this._axNodeSubPane.setNode(this.node());this._axNodeSubPane.show(this.element);this._axNodeSubPane.expand();this._sidebarPaneStack=new WebInspector.SidebarPaneStack();this._sidebarPaneStack.element.classList.add("flex-auto");this._sidebarPaneStack.show(this.element);this._sidebarPaneStack.addPane(this._computedTextSubPane);this._sidebarPaneStack.addPane(this._axNodeSubPane);}
WebInspector.targetManager.addModelListener(WebInspector.DOMModel,WebInspector.DOMModel.Events.AttrModified,this._onAttrChange,this);WebInspector.targetManager.addModelListener(WebInspector.DOMModel,WebInspector.DOMModel.Events.AttrRemoved,this._onAttrChange,this);WebInspector.targetManager.addModelListener(WebInspector.DOMModel,WebInspector.DOMModel.Events.CharacterDataModified,this._onNodeChange,this);WebInspector.targetManager.addModelListener(WebInspector.DOMModel,WebInspector.DOMModel.Events.ChildNodeCountUpdated,this._onNodeChange,this);},willHide:function()
{WebInspector.targetManager.removeModelListener(WebInspector.DOMModel,WebInspector.DOMModel.Events.AttrModified,this._onAttrChange,this);WebInspector.targetManager.removeModelListener(WebInspector.DOMModel,WebInspector.DOMModel.Events.AttrRemoved,this._onAttrChange,this);WebInspector.targetManager.removeModelListener(WebInspector.DOMModel,WebInspector.DOMModel.Events.CharacterDataModified,this._onNodeChange,this);WebInspector.targetManager.removeModelListener(WebInspector.DOMModel,WebInspector.DOMModel.Events.ChildNodeCountUpdated,this._onNodeChange,this);},_pullNode:function()
{this._node=WebInspector.context.flavor(WebInspector.DOMNode);if(this._computedTextSubPane)
this._computedTextSubPane.setNode(this._node);if(this._axNodeSubPane)
this._axNodeSubPane.setNode(this._node);this.update();},_onAttrChange:function(event)
{if(!this.node())
return;var node=event.data.node;if(this.node()!==node)
return;this.update();},_onNodeChange:function(event)
{if(!this.node())
return;var node=event.data;if(this.node()!==node)
return;this.update();},__proto__:WebInspector.ThrottledWidget.prototype};WebInspector.AccessibilitySidebarView.createExclamationMark=function(tooltip)
{var exclamationElement=createElement("label","dt-icon-label");exclamationElement.type="warning-icon";exclamationElement.title=tooltip;return exclamationElement;};WebInspector.AccessibilitySubPane=function(name)
{WebInspector.SidebarPane.call(this,name);this._axNode=null;this.registerRequiredCSS("accessibility/accessibilityNode.css");}
WebInspector.AccessibilitySubPane.prototype={setAXNode:function(axNode)
{},node:function()
{return this._node;},setNode:function(node)
{this._node=node;},createInfo:function(textContent,className)
{var classNameOrDefault=className||"info";var info=this.element.createChild("div",classNameOrDefault);info.textContent=textContent;return info;},createTreeOutline:function(className)
{var treeOutline=new TreeOutlineInShadow(className);treeOutline.registerRequiredCSS("accessibility/accessibilityNode.css");treeOutline.registerRequiredCSS("components/objectValue.css");treeOutline.element.classList.add("hidden");this.element.appendChild(treeOutline.element);return treeOutline;},__proto__:WebInspector.SidebarPane.prototype}
WebInspector.AXComputedTextSubPane=function()
{WebInspector.AccessibilitySubPane.call(this,WebInspector.UIString("Computed Text"));this._computedTextElement=this.element.createChild("div","ax-computed-text hidden");this._noTextInfo=this.createInfo(WebInspector.UIString("Node has no text alternative."));this._treeOutline=this.createTreeOutline();};WebInspector.AXComputedTextSubPane.prototype={setAXNode:function(axNode)
{if(this._axNode===axNode)
return;this._axNode=axNode;var treeOutline=this._treeOutline;treeOutline.removeChildren();var target=this.node().target();if(!axNode||axNode.ignored){this._computedTextElement.classList.add("hidden");treeOutline.element.classList.add("hidden");this._noTextInfo.classList.remove("hidden");return;}
this._computedTextElement.removeChildren();this._computedTextElement.classList.toggle("hidden",!axNode.name||!axNode.name.value);if(axNode.name&&axNode.name.value)
this._computedTextElement.createChild("div").textContent=axNode.name.value;var foundProperty=false;function addProperty(property)
{foundProperty=true;treeOutline.appendChild(new WebInspector.AXNodePropertyTreePropertyElement(property,target));}
if(axNode.value&&axNode.value.type===AccessibilityAgent.AXValueType.String)
addProperty(({name:"value",value:axNode.value}));var propertiesArray=(axNode.properties);for(var property of propertiesArray){if(property.name==AccessibilityAgent.AXWidgetAttributes.Valuetext){addProperty(property);break;}}
treeOutline.element.classList.toggle("hidden",!foundProperty)
this._noTextInfo.classList.toggle("hidden",!treeOutline.element.classList.contains("hidden")||!this._computedTextElement.classList.contains("hidden"));},__proto__:WebInspector.AccessibilitySubPane.prototype};WebInspector.AXNodeSubPane=function()
{WebInspector.AccessibilitySubPane.call(this,WebInspector.UIString("Accessibility Node"));this._noNodeInfo=this.createInfo(WebInspector.UIString("No accessibility node"));this._ignoredInfo=this.createInfo(WebInspector.UIString("Accessibility node not exposed"),"ax-ignored-info hidden");this._treeOutline=this.createTreeOutline();this._ignoredReasonsTree=this.createTreeOutline();};WebInspector.AXNodeSubPane.prototype={setAXNode:function(axNode)
{if(this._axNode===axNode)
return;this._axNode=axNode;var treeOutline=this._treeOutline;treeOutline.removeChildren();var ignoredReasons=this._ignoredReasonsTree;ignoredReasons.removeChildren();var target=this.node().target();if(!axNode){treeOutline.element.classList.add("hidden");this._ignoredInfo.classList.add("hidden");ignoredReasons.element.classList.add("hidden");this._noNodeInfo.classList.remove("hidden");this.element.classList.add("ax-ignored-node-pane");return;}else if(axNode.ignored){this._noNodeInfo.classList.add("hidden");treeOutline.element.classList.add("hidden");this.element.classList.add("ax-ignored-node-pane");this._ignoredInfo.classList.remove("hidden");ignoredReasons.element.classList.remove("hidden");function addIgnoredReason(property)
{ignoredReasons.appendChild(new WebInspector.AXNodeIgnoredReasonTreeElement(property,axNode,target));}
var ignoredReasonsArray=(axNode.ignoredReasons);for(var reason of ignoredReasonsArray)
addIgnoredReason(reason);if(!ignoredReasons.firstChild())
ignoredReasons.element.classList.add("hidden");return;}
this.element.classList.remove("ax-ignored-node-pane");this._ignoredInfo.classList.add("hidden");ignoredReasons.element.classList.add("hidden");this._noNodeInfo.classList.add("hidden");treeOutline.element.classList.remove("hidden");function addProperty(property)
{treeOutline.appendChild(new WebInspector.AXNodePropertyTreePropertyElement(property,target));}
for(var propertyName of["name","description","help","value"]){if(propertyName in axNode){var defaultProperty=({name:propertyName,value:axNode[propertyName]});addProperty(defaultProperty);}}
var roleProperty=({name:"role",value:axNode.role});addProperty(roleProperty);var propertyMap={};var propertiesArray=(axNode.properties);for(var property of propertiesArray)
propertyMap[property.name]=property;for(var propertySet of[AccessibilityAgent.AXWidgetAttributes,AccessibilityAgent.AXWidgetStates,AccessibilityAgent.AXGlobalStates,AccessibilityAgent.AXLiveRegionAttributes,AccessibilityAgent.AXRelationshipAttributes]){for(var propertyKey in propertySet){var property=propertySet[propertyKey];if(property in propertyMap)
addProperty(propertyMap[property]);}}},__proto__:WebInspector.AccessibilitySubPane.prototype};WebInspector.AccessibilitySidebarView.createSimpleValueElement=function(type,value)
{var valueElement;var AXValueType=AccessibilityAgent.AXValueType;if(!type||type===AXValueType.ValueUndefined||type===AXValueType.ComputedString)
valueElement=createElement("span");else
valueElement=createElementWithClass("span","monospace");var prefix;var valueText;var suffix;if(type===AXValueType.String||type===AXValueType.ComputedString||type===AXValueType.IdrefList||type===AXValueType.Idref){prefix="\"";valueText=value.replace(/\n/g,"\u21B5");suffix="\"";valueElement._originalTextContent="\""+value+"\"";}else{valueText=String(value);}
if(type&&type in WebInspector.AXNodePropertyTreeElement.TypeStyles)
valueElement.classList.add(WebInspector.AXNodePropertyTreeElement.TypeStyles[type]);valueElement.setTextContentTruncatedIfNeeded(valueText||"");if(prefix)
valueElement.insertBefore(createTextNode(prefix),valueElement.firstChild);if(suffix)
valueElement.createTextChild(suffix);valueElement.title=String(value)||"";return valueElement;}
WebInspector.AXNodePropertyTreeElement=function(target)
{this._target=target;TreeElement.call(this,"");}
WebInspector.AXNodePropertyTreeElement.prototype={appendNameElement:function(name)
{var nameElement=createElement("span");var AXAttributes=WebInspector.AccessibilityStrings.AXAttributes;if(name in AXAttributes){nameElement.textContent=WebInspector.UIString(AXAttributes[name].name);nameElement.title=AXAttributes[name].description;nameElement.classList.add("ax-readable-name");}else{nameElement.textContent=name;nameElement.classList.add("ax-name");nameElement.classList.add("monospace");}
this.listItemElement.appendChild(nameElement);},appendValueElement:function(value)
{var AXValueType=AccessibilityAgent.AXValueType;if(value.type===AXValueType.Idref||value.type===AXValueType.Node){this.appendRelationshipValueElement(value);return;}
if(value.type===AXValueType.IdrefList||value.type===AXValueType.NodeList){this.appendRelatedNodeListValueElement(value);return;}
if(value.sources){var sources=value.sources;for(var i=0;i<sources.length;i++){var source=sources[i];var child=new WebInspector.AXValueSourceTreeElement(source,this._target);this.appendChild(child);}}
var valueElement=WebInspector.AccessibilitySidebarView.createSimpleValueElement(value.type,String(value.value));this.listItemElement.appendChild(valueElement);},appendRelationshipValueElement:function(value)
{var relatedNode=value.relatedNodes[0];var deferredNode=new WebInspector.DeferredDOMNode(this._target,relatedNode.backendNodeId);var valueElement=createElement("span");function onNodeResolved(node)
{valueElement.appendChild(WebInspector.DOMPresentationUtils.linkifyNodeReference(node));if(relatedNode.text){var textElement=WebInspector.AccessibilitySidebarView.createSimpleValueElement(AccessibilityAgent.AXValueType.ComputedString,relatedNode.text);valueElement.appendChild(textElement);}}
deferredNode.resolve(onNodeResolved);this.listItemElement.appendChild(valueElement);},appendRelatedNodeListValueElement:function(value)
{var relatedNodes=value.relatedNodes;var numNodes=relatedNodes.length;var valueElement;if(value.type===AccessibilityAgent.AXValueType.IdrefList){var idrefs=value.value.split(/\s/);for(var idref of idrefs){var matchingNode=null;function matchesIDRef(relatedNode)
{if(relatedNode.idref!==idref)
return false;matchingNode=relatedNode;return true;}
relatedNodes.some(matchesIDRef);if(matchingNode){var relatedNode=(matchingNode);var backendNodeId=matchingNode.backendNodeId;var deferredNode=new WebInspector.DeferredDOMNode(this._target,backendNodeId);var child=new WebInspector.AXRelatedNodeTreeElement({deferredNode:deferredNode,idref:idref},relatedNode);this.appendChild(child);}else{this.appendChild(new WebInspector.AXRelatedNodeTreeElement({idref:idref}));}}
valueElement=WebInspector.AccessibilitySidebarView.createSimpleValueElement(value.type,String(value.value));}else{for(var i=0;i<numNodes;i++){var relatedNode=relatedNodes[i];var deferredNode=new WebInspector.DeferredDOMNode(this._target,relatedNode.backendNodeId);var child=new WebInspector.AXRelatedNodeTreeElement({deferredNode:deferredNode},relatedNode);this.appendChild(child);}
var numNodesString="("+numNodes+(numNodes===1?" node":" nodes")+")";valueElement=WebInspector.AccessibilitySidebarView.createSimpleValueElement(null,numNodesString);}
if(relatedNodes.length<=3)
this.expand();else
this.collapse();this.listItemElement.appendChild(valueElement);},__proto__:TreeElement.prototype}
WebInspector.AXNodePropertyTreePropertyElement=function(property,target)
{this._property=property;this.toggleOnClick=true;this.selectable=false;WebInspector.AXNodePropertyTreeElement.call(this,target);}
WebInspector.AXNodePropertyTreePropertyElement.prototype={onattach:function()
{this._update();},_update:function()
{this.listItemElement.removeChildren();this.appendNameElement(this._property.name);this.listItemElement.createChild("span","separator").textContent=": ";this.appendValueElement(this._property.value);},__proto__:WebInspector.AXNodePropertyTreeElement.prototype}
WebInspector.AXValueSourceTreeElement=function(source,target)
{this._source=source;WebInspector.AXNodePropertyTreeElement.call(this,target);}
WebInspector.AXValueSourceTreeElement.prototype={onattach:function()
{this._update();},appendSourceNameElement:function(source)
{var nameElement=createElement("span");var AXValueSourceType=AccessibilityAgent.AXValueSourceType;var type=source.type;var name;switch(type){case AXValueSourceType.Attribute:case AXValueSourceType.Placeholder:case AXValueSourceType.RelatedElement:if(source.nativeSource){var AXNativeSourceTypes=WebInspector.AccessibilityStrings.AXNativeSourceTypes;var nativeSource=source.nativeSource;nameElement.textContent=WebInspector.UIString(AXNativeSourceTypes[nativeSource].name);nameElement.title=WebInspector.UIString(AXNativeSourceTypes[nativeSource].description);nameElement.classList.add("ax-readable-name");break;}
nameElement.textContent=source.attribute;nameElement.classList.add("ax-name");nameElement.classList.add("monospace");break;default:var AXSourceTypes=WebInspector.AccessibilityStrings.AXSourceTypes;if(type in AXSourceTypes){nameElement.textContent=WebInspector.UIString(AXSourceTypes[type].name);nameElement.title=WebInspector.UIString(AXSourceTypes[type].description);nameElement.classList.add("ax-readable-name");}else{console.warn(type,"not in AXSourceTypes");nameElement.textContent=WebInspector.UIString(type);}}
this.listItemElement.appendChild(nameElement);},_update:function(){this.listItemElement.removeChildren();if(this._source.invalid){var exclamationMark=WebInspector.AccessibilitySidebarView.createExclamationMark(WebInspector.UIString("Invalid source."));this.listItemE                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <!DOCTYPE html>
<html lang="fr">
<head>
<base href="../../../../">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insertion de diagrammes</title>
<link rel="shortcut icon" href="media/navigation/favicon.ico">
<link type="text/css" href="normalize.css" rel="Stylesheet">
<link type="text/css" href="default.css" rel="Stylesheet">
<link type="text/css" href="prism.css" rel="Stylesheet">
<script type="text/javascript" src="polyfills.js"></script><script type="text/javascript" src="languages.js"></script><script type="text/javascript" src="fuzzysort.js"></script><script type="text/javascript" src="prism.js"></script><script type="text/javascript" src="help2.js" defer></script><script type="text/javascript" src="a11y-toggle.js" defer></script><script type="text/javascript" src="fr/langnames.js" defer></script><script type="text/javascript" src="paginathing.js" defer></script><script type="text/javascript" src="fr/bookmarks.js" defer></script><script type="text/javascript" src="fr/contents.js" defer></script><script type="text/javascript" src="help.js" defer></script><meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body itemscope="true" itemtype="http://schema.org/TechArticle">
<div class="header-extrawurst">
<header><div class="logo-container"><a class="logo" href="fr/text/shared/05/new_help.html"><div class="symbol"></div>
<p>Aide LibreOffice 6.4</p></a></div></header><div class="modules">
<button type="button" data-a11y-toggle="modules-nav" id="modules" onclick="setupModules('', 'fr');">Module</button><nav id="modules-nav"></nav>
</div>
</div>
<aside class="rightside"><input id="accordion-1" name="accordion-menu" type="checkbox"><label for="accordion-1">Contenu</label><div id="Contents" class="contents-treeview"></div></aside><aside class="leftside"><div id="Index">
<div class="index-label">Index  🔎︎ </div>
<div id="Bookmarks">
<input id="search-bar" type="text" class="search" placeholder="Rechercher dans tous les modules"><nav class="index"></nav>
</div>
</div></aside><div id="DisplayArea" itemprop="articleBody">
<a name="bm_id3153910"></a><meta itemprop="keywords" content="Diagrammes,insertion">
<meta itemprop="keywords" content="Regroupement de données sous forme de diagramme">
<meta itemprop="keywords" content="Insertion,diagrammes">
<meta itemprop="keywords" content="Feuilles de calcul,insertion de diagrammes">
<meta itemprop="keywords" content="Diagrammes,édition de données">
<meta itemprop="keywords" content="Édition,données des diagrammes">
<h1 itemprop="articleSection" id="hd_id3153910">
<a name="chart_insert"></a>Insertion de diagrammes</h1>
<p id="par_id3139133" class="paragraph">Il existe plusieurs méthodes pour réaliser un diagramme :</p>
<ul>
<li>
<p id="par_id6772972" class="paragraph">Insèrer un diagramme basé sur les données des cellules de Calc ou Writer.</p>
<p id="par_id6049684" class="paragraph">Ces diagrammes s'actualisent automatiquement lorsque la source de données est modifiée.</p>
</li>
<li>
<p id="par_id2356944" class="paragraph">Insérez un diagrapmme à partir d'un jeu de données par défaut, utilisez ensuite la boîte de dialogue Table de données pour saisir vos propres données pour ce diagramme.</p>
<p id="par_id866115" class="paragraph">Ces diagrammes peuvent être créés dans Writer, Impress ou Draw.</p>
</li>
<li>
<p id="par_id3146763" class="paragraph">Copier un diagramme dans un autre document à partir de Calc ou Writer.</p>
<p id="par_id701315" class="paragraph">Ces diagrammes sont des instantanés pris au moment de la copie. Ils ne s'actualisent pas lorsque les données de la source sont modifiées.</p>
</li>
</ul>
<div class="note">
<div class="noteicon"><img src="media/icon-themes/res/helpimg/note.svg" alt="Icône Remarque" title="Icône Remarque" style="width:40px;height:40px;"></div>
<div class="notetext"><p>Dans Calc, un diagramme est un objet sur une feuille qui peut être copié et collé sur une autre feuille du même document, les séries de données restent liées à la plage sur l'autre feuille. S'il est collé sur un autre document Calc, il a sa propre table de données de diagramme et n'est plus lié à la plage originale.</p></div>
</div>
<br>
<h2 itemprop="articleSection" id="hd_id719931">Diagramme dans une feuille de calcul Calc</h2>
<ol>
<li>
<p id="par_id3150275" class="paragraph">Sélectionnez les cellules contenant les données que vous souhaitez inclure dans le diagramme.</p>
</li>
<li>
<p id="par_id7211218" class="paragraph">Dans la barre d'outils <span class="emph">standard</span>, cliquez sur l'icône <span class="emph">Insérer un diagramme</span>.</p>
<p id="par_id7549363" class="paragraph">Vous voyez un aperçu du diagramme et l'assistant de diagramme.</p>
</li>
<li>
<p id="par_id9091769" class="paragraph">Suivez les instructions de <a target="_top" href="fr/text/schart/01/wiz_chart_type.html">l'Assistant Diagramme</a> pour créer un diagramme.</p>
</li>
</ol>
<h2 itemprop="articleSection" id="hd_id3761406">Diagramme dans un document texte Writer</h2>
<p id="par_id3155066" class="paragraph">Dans les documents Writer, vous pouvez insérer un diagramme obtenu à partir des données d'un tableau Writer.</p>
<ol>
<li>
<p id="par_id428479" class="listitem">Cliquer à l'intérieur du tableau Writer.</p>
</li>
<li>
<p id="par_id7236243" class="listitem">Choisissez <span class="emph">Insertion - Diagramme</span>.</p>
<p id="par_id6171452" class="paragraph">Vous voyez un aperçu du diagramme et l'assistant de diagramme.</p>
</li>
<li>
<p id="par_id3145419" class="paragraph">Suivez les instructions de <a target="_top" href="fr/text/schart/01/wiz_chart_type.html">l'Assistant Diagramme</a> pour créer un diagramme.</p>
</li>
</ol>
<h2 itemprop="articleSection" id="hd_id6436658">Diagramme basé sur ses propres valeurs</h2>
<ul>
<li>
<p id="par_id6944792" class="listitem">Dans Writer, Draw ou Impress, choisissez <span class="emph">Insertion - Diagramme</span> pour insérer un diagramme construit avec les données par défaut.</p>
</li>
<li>
<p id="par_id3152960" class="listitem">Pour modifier la valeur des exemples de données, double-cliquez sur le diagramme, puis choisissez <a target="_top" href="fr/text/schart/01/03010000.html"><span class="emph">Édition - Table de données</span></a>.</p>
</li>
</ul>
<a name="relatedtopics"></a><div class="relatedtopics">
<p class="related" itemprop="mentions"><a name="related"></a><span class="emph">Rubriques connexes</span></p>
<div class="relatedbody" itemprop="mentions">
<div class="embedded"><p class="embedded"><a name="wiz_chart_type"></a><a target="_top" href="fr/text/schart/01/wiz_chart_type.html">Assistant Diagramme - type de diagramme</a></p></div>
<div class="embedded"><p class="embedded"><a name="wiz_data_range"></a><a target="_top" href="fr/text/schart/01/wiz_data_range.html">Assistant Diagramme - plage de données</a></p></div>
<div class="embedded"><p class="embedded"><a name="wiz_data_series"></a><a target="_top" href="fr/text/schart/01/wiz_data_series.html">Assistant Diagramme - séries de données</a></p></div>
<div class="embedded"><p class="embedded"><a name="wiz_chart_elements"></a><a target="_top" href="fr/text/schart/01/wiz_chart_elements.html">Assistant Diagramme - éléments du diagramme</a></p></div>
<div class="embedded"><p class="embedded"><a name="chart_axis"></a><a target="_top" href="fr/text/shared/guide/chart_axis.html">Édition des axes des diagrammes</a></p></div>
<div class="embedded"><p class="embedded"><a name="chart_legend"></a><a target="_top" href="fr/text/shared/guide/chart_legend.html">Édition des légendes dans les diagrammes</a></p></div>
<div class="embedded"><p class="embedded"><a name="chart_title"></a><a target="_top" href="fr/text/shared/guide/chart_title.html">Édition des titres des diagrammes</a></p></div>
<div class="embedded"><p class="embedded"><a name="chart_barformat"></a><a target="_top" href="fr/text/shared/guide/chart_barformat.html">Ajout de texture aux barres de diagramme</a></p></div>
</div>
</div>
</div>
<div class="search-frame"></div>
<div class="donation-frame"></div>
<footer><div id="DEBUG" class="debug">
<h3 class="bug">Help content debug info:</h3>
<p>This page is: <a href="https://opengrok.libreoffice.org/xref/help/source/text/shared/guide/chart_insert.xhp" target="_blank">/text/shared/guide/chart_insert.xhp</a></p>
<p>Title is: Insertion de diagrammes</p>
<p id="bm_module"></p>
<p id="bm_system"></p>
<p id="bm_HID"></p>
</div></footer>
</body>
</html>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <!DOCTYPE html>
<html lang="fr">
<head>
<base href="../../../../">
<meta 