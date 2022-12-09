Feature: API demo

  @api @sanityTest @Regression
  Scenario Outline: API demo
    Given trigger api with method "<method>","<post_uri>","<S1_service_Headers>" and "<payload>"
    Then api should be successful "<validation>" and "<http-Code>"

    Examples:
      | TC_ID | Desc                                       | cdm_base_url | post_uri    | S1_service_Headers | userid | S1_input_Parameters | method | payload          | http-Code | validation |
      | TC001 | To get Users details withe generic headers | cdm_url      | sample_Get  | GenericHeaders     |        |                     | get    |                  | 200       | config     |
      | TC002 | To get Users details withe custom headers  | cdm_url      | sample_Get2 | GenericHeaders_Cu  |        |                     | get    |                  | 200       | config     |
      | TC003 | To create user with Mandatory fields       | cdm_url      | sample_Post | GenericHeaders     |        |                     | post   | CreateUser_TC001 | 201       | id         |




# @api @negative
# Scenario Outline: API demo for negative test cases
#   Given trigger api with method "<method>","<post_uri>","<S1_service_Headers>" and "<payload>"
#   Then api should be successful "<validation>" and "<http-Code>"

#   Examples:
#     | TC_ID | Desc                   | cdm_base_url | post_uri    | S1_service_Headers | userid | S1_input_Parameters | method | payload          | http-Code | validation |
#     | TC001 | To get Users with Gene | cdm_url      | sample_Get  | GenericHeaders     |        |                     | get    |                  | 200       | config     |
#     | TC002 |                        | cdm_url      | sample_Get2 | GenericHeaders_Cu  |        |                     | get    |                  | 200       | config     |
#     | TC003 |                        | cdm_url      | sample_Post | GenericHeaders     |        |                     | post   | CreateUser_TC001 | 201       | config     |


# @api @mockData
# Scenario Outline: API demo for mockData
#   Given trigger api with method "<method>","<post_uri>","<S1_service_Headers>" and "<payload>"
#   Then api should be successful "<validation>" and "<http-Code>"

#   Examples:
#     | TC_ID | Desc                   | cdm_base_url | post_uri    | S1_service_Headers | userid | S1_input_Parameters | method | payload          | http-Code | validation |
#     | TC001 | To get Users with Gene | cdm_url      | sample_Get  | GenericHeaders     |        |                     | get    |                  | 200       | config     |
#     | TC002 |                        | cdm_url      | sample_Get2 | GenericHeaders_Cu  |        |                     | get    |                  | 200       | config     |
#     | TC003 |                        | cdm_url      | sample_Post | GenericHeaders     |        |                     | post   | CreateUser_TC001 | 201       | config     |