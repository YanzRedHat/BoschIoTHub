/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
package com.bosch.iothub.developerui.config;

public class DeviceRegistryClientProperties {

    private String url;
    private String username;
    private String password;
    private boolean hostnameVerificationRequired = true;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isHostnameVerificationRequired() {
        return hostnameVerificationRequired;
    }

    public void setHostnameVerificationRequired(final boolean hostnameVerificationRequired) {
        this.hostnameVerificationRequired = hostnameVerificationRequired;
    }
}
