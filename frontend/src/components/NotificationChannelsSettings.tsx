import React, { useState, useEffect } from "react";
import { Loader2, Plus, Trash2, Settings } from "lucide-react";
import toast from "react-hot-toast";
import { channelsApi } from "../api/channels";
import type { NotificationChannel, ChannelType } from "../types";

export const NotificationChannelsSettings: React.FC = () => {
  const [channels, setChannels] = useState<NotificationChannel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [channelType, setChannelType] = useState<ChannelType>("SLACK");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [botToken, setBotToken] = useState("");
  const [chatId, setChatId] = useState("");

  const loadChannels = async () => {
    try {
      const res = await channelsApi.getChannels();
      // Handle paginated response if backend returns it, else raw list if not paginated.
      // The API typings use PaginatedResponse, assuming DRF pagination is on.
      setChannels(res.results || res as any);
    } catch {
      toast.error("Failed to load notification channels.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadChannels();
  }, []);

  const handleAddChannel = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let config = {};
      if (channelType === "SLACK" || channelType === "DISCORD" || channelType === "WEBHOOK") {
        config = { webhook_url: webhookUrl };
      } else if (channelType === "TELEGRAM") {
        config = { bot_token: botToken, chat_id: chatId };
      }

      await channelsApi.createChannel({
        name,
        channel_type: channelType,
        config,
        is_active: true,
      });

      toast.success("Notification channel added!");
      setShowForm(false);
      setName("");
      setWebhookUrl("");
      setBotToken("");
      setChatId("");
      loadChannels();
    } catch {
      toast.error("Failed to create channel.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this channel?")) return;
    try {
      await channelsApi.deleteChannel(id);
      toast.success("Channel deleted.");
      loadChannels();
    } catch {
      toast.error("Failed to delete channel.");
    }
  };

  if (isLoading) {
    return <div className="p-4 flex justify-center"><Loader2 className="animate-spin text-emerald-400" /></div>;
  }

  return (
    <div className="pt-6 border-t border-neutral-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
          <Settings className="h-4 w-4 text-emerald-400" />
          <span>External Integrations (Slack, Telegram, Webhooks)</span>
        </h3>
        {!showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="text-xs font-semibold px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-white transition flex items-center space-x-1"
          >
            <Plus className="h-3 w-3" />
            <span>Add Integration</span>
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleAddChannel} className="mb-6 p-4 rounded-xl border border-neutral-700 bg-neutral-800/30 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">Name</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Engineering Slack" className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">Type</label>
              <select value={channelType} onChange={e => setChannelType(e.target.value as ChannelType)} className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm">
                <option value="SLACK">Slack Webhook</option>
                <option value="TELEGRAM">Telegram Bot</option>
                <option value="DISCORD">Discord Webhook</option>
                <option value="WEBHOOK">Custom Webhook</option>
              </select>
            </div>
          </div>

          {(channelType === "SLACK" || channelType === "DISCORD" || channelType === "WEBHOOK") && (
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">Webhook URL</label>
              <input type="url" required value={webhookUrl} onChange={e => setWebhookUrl(e.target.value)} placeholder="https://hooks.slack.com/services/..." className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm" />
            </div>
          )}

          {channelType === "TELEGRAM" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Bot Token</label>
                <input type="text" required value={botToken} onChange={e => setBotToken(e.target.value)} placeholder="12345:ABCDEF..." className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Chat ID</label>
                <input type="text" required value={chatId} onChange={e => setChatId(e.target.value)} placeholder="-1001234567890" className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm" />
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white transition">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-neutral-950 rounded-lg flex items-center space-x-1">
              {isSubmitting && <Loader2 className="h-3 w-3 animate-spin" />}
              <span>Save Integration</span>
            </button>
          </div>
        </form>
      )}

      {channels.length === 0 && !showForm ? (
        <div className="text-center py-6 border border-dashed border-neutral-800 rounded-xl">
          <p className="text-xs text-neutral-500">No external integrations added yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {channels.map(channel => (
            <div key={channel.id} className="p-4 rounded-xl border border-neutral-800 bg-neutral-950 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-white">{channel.name}</h4>
                <p className="text-xs text-neutral-500 mt-0.5">{channel.channel_type} • Active</p>
              </div>
              <button type="button" onClick={() => handleDelete(channel.id)} className="text-neutral-500 hover:text-red-400 transition p-2 bg-neutral-900 rounded-lg">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
