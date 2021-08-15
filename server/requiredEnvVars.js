'use strict';

module.exports = {
    validateRequiredEnvVars(config, required_env_vars) {

        for (let i = 0; i < required_env_vars.length; i = i + 1) {

            const required_env_var = required_env_vars[i];
            if (!process.env[required_env_var]) {
                console.error('[CRITICAL] Missing required env variable:', required_env_var);
                process.exit(0);
            }

            config[required_env_var] = process.env[required_env_var];
        }

        return config;
    }
};
