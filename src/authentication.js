const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');

const { expressOauth, OAuthStrategy } = require('@feathersjs/authentication-oauth');

class GithubStrategy extends OAuthStrategy {
  async getEntityData(profile) {
    const {
      login: github_username,
      id: github_id,
      name,
    } = profile;
    return {
      github_id,
      github_username,
      name,
    };
  }
  async getEntityQuery(profile) {
    return { 
      github_id: profile.id,
    };
  }
};

module.exports = app => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('github', new GithubStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
};
