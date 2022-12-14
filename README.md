
# FreeSWITCH Dialplan Designer

Since working with multiple VOIP/Contact Center/IVR vendors, the only useful feature some of them provided is the ability to desgin the Call Flow using a GUI tool, where the user can drag and drop nodes and connect edges between them, then configure what each node can do to the call.
This is the only thing i find FreeSWITCH is missing (as well as other vendors); the easy to use GUI interface to configure how a call is treated, as well as how to configure the system as a whole (FusionPBX is great, but I avoid using anything PHP).

Hence comes this little tool, FreeSWITCH Dialplan Designer, a web interface to create XML Dialplans for FreeSWITCH.

This is the UI part of the tool, developed on React, and utilizes the great [reactflow](https://reactflow.dev/) module that enables most of this project.

Without the [Backend](https://github.com/frisky5/freeswitch-dialplan-designer-be)  this project will mostly do nothing, the backend progress is still 0% as of now.

As of now, the UI supports the following Nodes (using the nodes requirs FreeSWITCH XML dialplan understanding):
1. Extension
* This is equevelant to Extension in the XML Dialplan, where conditions are actions are grouped inside.
* An Extension can have a name in its configuration.
2. Condition
* Equivelant to Condition in XML Dialplan, this mostly controls how the call is processed.
* A condition can be either a single condition or multiple conditions with AND or OR logic in between.
3. Action
* Equivelant to Action in the XML Dialplan, which is the sequence of operations to be done on a call (answer,hangup,transfer,etc)


currently these nodes are in basiuc form, meaning that the user must manually enter for example the Condition Filed and Expression, as the project goes on, the condition and action fields will have lists that makes it easier to select them, or even have logic specific nodes that does something in specific, like a Date Checker node, or a called number checker node.
