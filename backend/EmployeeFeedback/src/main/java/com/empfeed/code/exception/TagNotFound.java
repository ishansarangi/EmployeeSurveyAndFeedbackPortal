package com.empfeed.code.exception;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import graphql.ErrorType;
import graphql.GraphQLError;
import graphql.language.SourceLocation;

/**
 * @author sabyasachi
 * @since Apr 22, 2020
 */
public class TagNotFound extends RuntimeException implements GraphQLError {

	private static final long serialVersionUID = 1L;
	private Map<String, Object> extensions = new HashMap<>();

    public TagNotFound(String message, Long tagId) {
        super(message);
        extensions.put("invalidTagId", tagId);
    }

    @Override
    public List<SourceLocation> getLocations() {
        return null;
    }

    @Override
    public Map<String, Object> getExtensions() {
        return extensions;
    }

    @Override
    public ErrorType getErrorType() {
        return ErrorType.DataFetchingException;
    }
}
