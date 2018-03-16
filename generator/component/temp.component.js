import template from './<%= name %>.html';
import controller from './<%= name %>.controller';
import './<%= name %>.scss';

let <%=camelCaseName%>Component = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'self'
};

export default <%=camelCaseName%>Component;
