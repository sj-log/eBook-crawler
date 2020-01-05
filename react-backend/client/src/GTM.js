import React from 'react';
import gtmParts from 'react-google-tag-manager';

class GoogleTagManager extends React.Component {
constructor(props){
    super(props)
    console.log(props);

}
   
    componentDidMount() {
        const dataLayerName = this.props.dataLayerName || 'dataLayer';
        const scriptId = this.props.scriptId || 'react-google-tag-manager-gtm';

        if (!window[dataLayerName]) {
          
            const script = document.createElement("script")
            const gtmScriptNode = document.getElementById(scriptId)
            const scriptText = document.createTextNode(gtmScriptNode.textContent)
        
            script.appendChild(scriptText)
            document.head.appendChild(script)      }
    }

    render() {

        const {gtmId,scriptId} = this.props;

        const gtm = gtmParts({
            id: gtmId,
            additionalEvents: {
                 sourcegroup: this.props.gtmGroupname,
                 sourceid:this.props.gtmSource,
                 age:this.props.age,
                 mtongue:this.props.gtmMtongue,
                 city:this.props.city
            }
        })

        return (
            <div>
                <div>{gtm.noScriptAsReact()}</div>
                <div id={scriptId || 'react-google-tag-manager-gtm'}>
                    {gtm.scriptAsReact()}
                </div>
            </div>
        );
    }
}

// GoogleTagManager.propTypes = {
//     gtmId: React.PropTypes.string.isRequired,
//     dataLayerName: React.PropTypes.string,
//     additionalEvents: React.PropTypes.object,
//     previewVariables: React.PropTypes.string,
//     scriptId: React.PropTypes.string,
//     scheme: React.PropTypes.string,
// };

export default GoogleTagManager;