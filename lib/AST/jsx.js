/**
 * Syntax

JSX extends the PrimaryExpression in the ECMAScript 6th Edition (ECMA-262) grammar:

PrimaryExpression :

JSXElement
Elements

JSXElement :


JSXSelfClosingElement

JSXOpeningElement JSXChildrenopt JSXClosingElement
(names of JSXOpeningElement and JSXClosingElement should match)
JSXSelfClosingElement :

< JSXElementName JSXAttributesopt / >
JSXOpeningElement :

< JSXElementName JSXAttributesopt >
JSXClosingElement :

< / JSXElementName >
JSXElementName :

JSXIdentifier
JSXNamespacedName
JSXMemberExpression
JSXIdentifier :

IdentifierStart
JSXIdentifier IdentifierPart
JSXIdentifier NO WHITESPACE OR COMMENT -
JSXNamespacedName :

JSXIdentifier : JSXIdentifier
JSXMemberExpression :

JSXIdentifier . JSXIdentifier
JSXMemberExpression . JSXIdentifier
Attributes

JSXAttributes :


JSXSpreadAttribute JSXAttributesopt
JSXAttribute JSXAttributesopt
JSXSpreadAttribute :

{ ... AssignmentExpression }
JSXAttribute :


JSXAttributeName JSXAttributeInitializeropt
JSXAttributeName :

JSXIdentifier
JSXNamespacedName
JSXAttributeInitializer :


= JSXAttributeValue
JSXAttributeValue :


" JSXDoubleStringCharactersopt "
' JSXSingleStringCharactersopt '
{ AssignmentExpression }
JSXElement
JSXDoubleStringCharacters :


JSXDoubleStringCharacter JSXDoubleStringCharactersopt
JSXDoubleStringCharacter :


SourceCharacter but not "
JSXSingleStringCharacters :


JSXSingleStringCharacter JSXSingleStringCharactersopt
JSXSingleStringCharacter :


SourceCharacter but not '
Children

JSXChildren :


JSXChild JSXChildrenopt
JSXChild :

JSXText
JSXElement
{ JSXChildExpressionopt }
JSXText :

JSXTextCharacter JSXTextopt
JSXTextCharacter :

SourceCharacter but not one of {, <, > or }
JSXChildExpression :

AssignmentExpression
... AssignmentExpression
Whitespace and Comments

JSX uses the same punctuators and braces as ECMAScript. WhiteSpace, LineTerminators and Comments are generally allowed between any punctuators.
 */