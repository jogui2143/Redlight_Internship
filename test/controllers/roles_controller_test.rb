require "test_helper"

class RolesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @role = roles(:one)
    @nametest = "test"
  end

  test "should get index" do
    get api_v1_roles_url, as: :json
    assert_response :success
  end

  test "should create role" do
    assert_difference("Role.count") do
      post api_v1_roles_url, params: { role: { name: @nametest } }, as: :json
    end

    assert_response :created
  end

  test "should show role" do
    get api_v1_role_url(@role), as: :json
    assert_response :success
  end

  test "should update role" do
    patch api_v1_role_url(@role), params: { role: { name: @nametest } }, as: :json
    assert_response :success
  end

  test "should destroy role" do
    assert_difference("Role.count", -1) do
      delete api_v1_role_url(@role), as: :json
    end

    assert_response :success
  end
end
